import uuid

import requests

from blogs import domain


def test_post():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description", "markdown": "# The best title"}

    # When
    response = requests.post(f'https://{domain}/dev/api/blogs', json=payload)

    # Then
    assert response.status_code == 200
    assert payload["title"] in response.json()["id"]
    assert payload["title"] == response.json()["title"]
    assert payload["description"] == response.json()["description"]
    assert payload["markdown"] == response.json()["markdown"]


def test_post_not_json():
    # Given
    payload = "Some data"

    # When
    response = requests.post(f'https://{domain}/dev/api/blogs', data=payload)

    # Then
    assert response.status_code == 400


def test_missing_title():
    # Given
    payload = {"description": "The best description", "markdown": "# The best title"}

    # When
    response = requests.post(f'https://{domain}/dev/api/blogs', json=payload)

    # Then
    assert response.status_code == 400


def test_missing_markdown():
    # Given
    payload = {"title": str(uuid.uuid4()), "description": "The best description"}

    # When
    response = requests.post(f'https://{domain}/dev/api/blogs', json=payload)

    # Then
    assert response.status_code == 400
