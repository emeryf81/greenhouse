"""Hortulus horticulture engine - pure Python, no Home Assistant imports.

Modules
-------
models         dataclasses for plants, layout, tasks and runtime snapshots
serde          lossless (de)serialisation of the dataclasses
region         frost dates, hemispheres, seasons
plantdb        starter database + overrides + companion relations
geometry       footprints, plant counts, snapping
schedule       sow / transplant / harvest windows and live timing advice
compatibility  companion scoring, spacing conflicts, crop rotation
weather        forecast parsing, frost, greenhouse climate, ET0, GDD
watering       moisture bands and irrigation recommendations
tasks          task generation, merge, recurrence, postpone cascade
analysis       orchestrates everything into a GardenAnalysis
succession     expands succession sowings into dated plantings
migrations     stored document versioning
planio         import / export
i18n           English / Dutch message catalog
"""
