import uuid

import requests


def test_post():
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}

    response = requests.post('https://18nldn6xj2.execute-api.eu-west-2.amazonaws.com/dev/api/blogs', json=payload)

    assert response.status_code == 200
    assert payload["title"] == response.json()["title"]
    assert payload["description"] == response.json()["description"]
    assert payload["markdown"] == response.json()["markdown"]
