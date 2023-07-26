const mockData = [
  {
    id: '1',
    title: 'Title 1',
    text: 'Text 1',
    image: 'Image 1',
    authorId: '1',
    tags: 'tag1, tag2',
  },
];

export const postMock = {
  sequelize: {
    transaction: jest.fn(),
  },
  findAll: jest.fn(() => mockData),
  findOne: jest.fn(({ where: { id: postId } }) =>
    mockData.find((p) => p.id === postId),
  ),
  create: jest.fn((data) => data),
  update: jest.fn((data) => data),
};
