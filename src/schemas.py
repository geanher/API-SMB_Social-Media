from pydantic import BaseModel


class Message(BaseModel):
    id_message: str
    message: str
    url: str
    date: str
    id_RRSS: str
    id_job: str
    created_at: str

    class Config:
        orm_mode = True
