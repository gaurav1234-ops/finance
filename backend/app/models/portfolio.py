from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.session import Base

class PortfolioItem(Base):
    __tablename__ = "portfolio_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    ticker = Column(String, index=True, nullable=False)
    shares = Column(Float, nullable=False)
    average_price = Column(Float, nullable=False)
    added_at = Column(DateTime(timezone=True), server_default=func.now())
