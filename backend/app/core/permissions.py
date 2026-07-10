from fastapi import HTTPException
from app.models.user import User


def require_roles(user: User, allowed_roles: list):
    if user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to perform this action."
        )