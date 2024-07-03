const testReviewData = {
  testReviews: [
    {
      "_id": "id1234",
      "drama": "66819b45fc1ef4878623667e",
      "author": undefined,
      "stars": "8",
      "title": "Review Title 1",
      "description": "Review description"
    },
    {
      "_id": "id1234",
      "drama": "66819b45fc1ef4878623667e",
      "author": undefined,
      "stars": "10",
      "title": "Review Title 2",
      "description": "Review description"
    },
    {
      "_id": "id1234",
      "drama": "885sdsds56sd4s24f8ef",
      "author": undefined,
      "stars": "6",
      "title": "Review Title 3",
      "description": "Review description"
    },
  ],
  testUserIds: [
    { "user1": "abg123", },
    { "user2": "abc443", }
  ],
};

testReviewData.testReviews[0].author = testReviewData.testUserIds[0].user1;
testReviewData.testReviews[1].author = testReviewData.testUserIds[1].user2;
testReviewData.testReviews[2].author = testReviewData.testUserIds[0].user1;

export default testReviewData;