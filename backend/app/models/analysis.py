from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.database.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    region = Column(String(200), nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    # Solar resource
    solar_irradiance = Column(Float)
    temperature = Column(Float)

    # Wind resource
    wind_speed = Column(Float)
    wind_power_density = Column(Float)

    # Solar energy forecast
    solar_daily_energy = Column(Float)
    solar_annual_energy = Column(Float)

    # Wind energy forecast
    wind_daily_energy = Column(Float)
    wind_annual_energy = Column(Float)

    # Suitability scores
    solar_score = Column(Float)
    temperature_score = Column(Float)
    wind_score = Column(Float)
    overall_score = Column(Float)

    recommendation = Column(String(100))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )