namespace Project3.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string? MessageText { get; set; }
        public byte[]? BlobContent { get; set; }
        public string? TimeSent { get; set; }
        public string? SenderName { get; set; }
        public byte[]? SenderAvatar { get; set;}

        public Message(int senderId, int receiverId, string? messageText, byte[]? blobContent, string? timeSent, string? senderName, byte[]? senderAvatar)
        {
            SenderId = senderId;
            ReceiverId = receiverId;
            MessageText = messageText;
            BlobContent = blobContent;
            TimeSent = timeSent;
            SenderName = senderName;
            SenderAvatar = senderAvatar;
        }
    }
}
