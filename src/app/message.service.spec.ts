import { MessageService } from './message.service';

fdescribe('MessageService', () => {
  let service: MessageService;

  it('should initialize with an empty messages array', () => {
    // ARRANGE
    service = new MessageService();
    // ASSERT
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    // ARRANGE
    service = new MessageService();
    // ACT
    service.add('Im a message');
    // ASSERT
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    // ARRANGE
    service = new MessageService();
    // ACT
    service.add('a message');
    service.clear();
    // ASSERT
    expect(service.messages.length).toBe(0);
  });
});
