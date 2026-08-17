from pydantic import BaseModel


class ProjectCreate(BaseModel):
    project_name: str
    description: str
    location: str
    region: str


class ProjectUpdate(BaseModel):
    project_name: str
    description: str
    location: str
    region: str


class ProjectResponse(BaseModel):
    id: int
    project_name: str
    description: str
    location: str
    region: str
    created_by: int

    class Config:
        from_attributes = True