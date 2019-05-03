import uuid

import requests

from blogs import base_url


def test_get_all():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}
    requests.post(f'{base_url}/api/blogs', json=payload)

    # When
    response = requests.get(f'{base_url}/api/blogs')

    # Then
    assert response.status_code == 200
    value = next(filter(lambda i: i["title"] == payload["title"], list(response.json())))
    assert payload["title"] == value["title"]
    assert payload["description"] == value["description"]
    assert payload["markdown"] == value["markdown"]
