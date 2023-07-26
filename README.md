### Тесты сервера

- использовался jest с пакетом @nestjs/testing
- взаимодействие с БД заменялось моками
- тестировался класс PostService, файл с тестами ./server/src/post/post.service.spec.ts
- для запуска тестов выполнить команду `npm run test`

### Тесты клиента

- использовался jest с пакетом @testing-library/react
- тестировался компонент Post, файл с тестами ./client/src/components/Post/Post.test.tsx
- для запуска тестов выполнить команду `npm run test`
