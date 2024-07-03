const testDramaData = {
  results: [{
    "_id": "12346e",
    "dramaId": "12346",
    "title": "Drama 1",
    "year": 2024,
    "voteAverage": 6.3,
    "voteCount": 3,
    "image": "/aRtLEHMrcbG5InnfL8l3ZdIWS5I.jpg",
    "poster": "/bGVdZ8nc99GIwCDxmXpGP0oCSzT.jpg",
    "synopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor…",
    "genreIds": [18, 10765],
    "reviews": [{ "author": "12346e", "content": "This is a great drama!", "rating": 5 }, { "author": "12346e", "content": "This is a great drama!", "rating": 5 }, { "author": "12346e", "content": "This is a great drama!", "rating": 5 }, { "author": "12346e", "content": "This is a great drama!", "rating": 5 },],
    "cast": [{ "actor": "60f1b0f1b5f7b40015f6b3f1", "role": "Lead", "character": "Jin Su Ji" }, { "actor": "60f1b0f1b5f7b40015f6b3f2", "role": "Lead", "character": "Kang U Ri" }]
  },
  {
    "_id": "12346f",
    "dramaId": "12347",
    "title": "Drama Title",
    "year": 2024,
    "voteAverage": 6.3,
    "voteCount": 3,
    "image": "/aRtLEHMrcbG5InnfL8l3ZdIWS5I.jpg",
    "poster": "/bGVdZ8nc99GIwCDxmXpGP0oCSzT.jpg",
    "synopsis": "A healing romance begins between fallen star doctor Jin Su Ji and stub…",
    "genreIds": [18, 10765],
    "reviews": [{ "author": "12346e", "content": "This is a great drama!", "rating": 5 }, { "author": "12346e", "content": "This is a great drama!", "rating": 5 }, { "author": "12346e", "content": "This is a great drama!", "rating": 5 }, { "author": "12346e", "content": "This is a great drama!", "rating": 5 },],
    "cast": [{ "actor": "60f1b0f1b5f7b40015f6b3f1", "role": "Lead", "character": "Jin Su Ji" }, { "actor": "60f1b0f1b5f7b40015f6b3f2", "role": "Lead", "character": "Kang U Ri" }]
  },],
  mockDrama: {
    _id: 'someId',
    title: 'Example Drama',
    cast: [{
      _id: 'castId',
      actor: {
        _id: 'actorId',
        name: 'Actor Name'
      }
    }],
    reviews: [{
      _id: 'reviewId',
      author: {
        _id: 'authorId',
        user: {
          _id: 'userId',
          name: 'User Name'
        }
      },
      drama: {
        _id: 'dramaId',
        title: 'Drama Title'
      }
    }]
  },
  mockActor: {
    cast: [{
      actor: {
        _id: 'actorId',
        name: 'Actor Name'
      }
    }],
  },
  dramaList: [{ "dramaId": "drama.id", "title": "drama.name", "year": "date", "voteAverage": "drama.vote_average", "voteCount": "drama.vote_count", "image": "drama.backdrop_path", "poster": "drama.poster_path", "synopsis": "drama.overview", "genreIds": ["drama.genre_ids"] }, { "dramaId": "drama.id", "title": "drama.name", "year": "date", "voteAverage": "drama.vote_average", "voteCount": "drama.vote_count", "image": "drama.backdrop_path", "poster": "drama.poster_path", "synopsis": "drama.overview", "genreIds": ["drama.genre_ids"] }, { "dramaId": "drama.id", "title": "drama.name", "year": "date", "voteAverage": "drama.vote_average", "voteCount": "drama.vote_count", "image": "drama.backdrop_path", "poster": "drama.poster_path", "synopsis": "drama.overview", "genreIds": ["drama.genre_ids"] }],
  castList: [{ "actorId": "actor.id", "name": "actor.name", "image": "actor.profile_path" }, { "actorId": "actor.id", "name": "actor.name", "image": "actor.profile_path" }, { "actorId": "actor.id", "name": "actor.name", "image": "actor.profile_path" }],
};
export default testDramaData;