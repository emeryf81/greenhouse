<!-- Generated from the sources by a script: code excerpts below are verbatim. -->
[← 7. Scheduling, Compatibility, and Watering Algorithms](07-scheduling-compatibility-and-watering-algorithms.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [9. Tests →](09-tests.md)

## 8. Example HA Automations & Dashboards

Full files: [`examples/automations.yaml`](../../examples/automations.yaml) ·
[`examples/dashboard.yaml`](../../examples/dashboard.yaml). The same ideas as importable
blueprints (frost warning on a lamp, harvest by button or NFC tag, water a dry bed at a good
moment, announce urgent jobs) live in `blueprints/automation/hortulus/`.

```yaml
# 1) Irrigate Bed 1 in the morning when Hortulus recommends it.
#    run_irrigation_plan opens the valve through Hortulus' controller: pump interlock,
#    maximum runtime, frost lockout and a guaranteed shut-off even if this automation
#    is reloaded or stopped halfway (a plain open/delay/close would leave the valve open).
- id: hortulus_irrigate_bed_1
  alias: "Hortulus · Irrigate Bed 1 when recommended"
  mode: single
  triggers:
    - trigger: time
      at: "06:30:00"
    - trigger: state
      entity_id: binary_sensor.bed_1_needs_water
      to: "on"
      for: "00:15:00"
  conditions:
    - condition: state
      entity_id: binary_sensor.bed_1_needs_water
      state: "on"
    - condition: time
      after: "05:30:00"
      before: "10:00:00"
    # never water right before a frost night
    - condition: state
      entity_id: binary_sensor.hortulus_frost_warning
      state: "off"
  actions:
    - action: garden_manager.run_irrigation_plan
      data:
        beds: ["Bed 1"]
      response_variable: run
    - action: logbook.log
      data:
        name: Hortulus
        message: "Irrigation Bed 1: {{ run.runs | map(attribute='minutes') | sum | round(0) }} min"

# 2) Generic version: one automation for every bed, driven by the
#    garden_manager_irrigation_recommended event (fired once per bed per day).
#    The bed needs an irrigation entity (Planner → bed → Irrigation); Hortulus then
#    runs it safely with the same limits as above.
- id: hortulus_irrigate_any_bed
  alias: "Hortulus · Irrigate any bed with a mapped valve"
  mode: queued
  triggers:
    - trigger: event
      event_type: garden_manager_irrigation_recommended
  conditions:
    - condition: time
```

```yaml
  alias: "Hortulus · Greenhouse vent follows advice"
  mode: restart
  triggers:
    - trigger: state
      entity_id: sensor.greenhouse_zone_a_greenhouse_advice
  actions:
    - choose:
        - conditions:
            - condition: state
              entity_id: sensor.greenhouse_zone_a_greenhouse_advice
              state: ["ventilate", "shade"]
          sequence:
            - action: cover.open_cover
              target:
                entity_id: cover.greenhouse_vent
        - conditions:
            - condition: state
              entity_id: sensor.greenhouse_zone_a_greenhouse_advice
              state: ["close_up", "heat"]
          sequence:
```

```yaml
          actions:
            - action: "HORTULUS_DONE_{{ trigger.event.data.task_id }}"
              title: "Done"
            - action: "HORTULUS_LATER_{{ trigger.event.data.task_id }}"
              title: "Tomorrow"

- id: hortulus_task_push_reply
  alias: "Hortulus · Handle task notification buttons"
  mode: queued
  triggers:
    - trigger: event
      event_type: mobile_app_notification_action
  conditions:
    - "{{ trigger.event.data.action is match('HORTULUS_(DONE|LATER)_') }}"
  actions:
    - variables:
        task_id: "{{ trigger.event.data.action.split('_')[-1] }}"
    - if: "{{ trigger.event.data.action.startswith('HORTULUS_DONE_') }}"
      then:
        - action: garden_manager.complete_task
          data:
            task_id: "{{ task_id }}"
      else:
        - action: garden_manager.postpone_task
          data:
            task_id: "{{ task_id }}"
            days: 1
            reason: "Snoozed from phone"

# 6) Weekly pest round as a recurring user task (created once).
- id: hortulus_create_pest_round
  alias: "Hortulus · Create a weekly slug patrol in spring"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: template
      value_template: "{{ now().month == 4 and now().day == 1 }}"
  actions:
    - action: garden_manager.add_task
      data:
        title: "Slug patrol after dusk"
        type: pest_check
        priority: normal
        estimated_minutes: 15
```

Dashboard (sections view, built‑in cards only):

```yaml
# which the integration loads by itself (no resource to add).
title: Garden
path: garden
icon: mdi:sprout
type: sections
sections:
  - title: Today
    cards:
      - type: tile
        entity: sensor.hortulus_tasks_due_today
        name: Tasks today
        icon: mdi:clipboard-check-outline
      - type: tile
        entity: sensor.hortulus_frost_risk_next_48h
        name: Frost risk (48 h)
        color: blue
      - type: tile
        entity: sensor.hortulus_next_task
        name: Next task
      - type: custom:hortulus-tasks-card
        title: Garden today
        days: 0
      - type: custom:hortulus-tasks-card
        title: My tasks this week
        days: 7
        assignee: me
        max: 6
      - type: todo-list
        entity: todo.hortulus_this_week
        title: This week in the garden
      - type: conditional
        conditions:
          - condition: state
```

---

---

[← 7. Scheduling, Compatibility, and Watering Algorithms](07-scheduling-compatibility-and-watering-algorithms.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [9. Tests →](09-tests.md)
