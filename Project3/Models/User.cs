namespace Project3.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string? UserName { get; set; }

        public string? UserPassword { get; set; }

        public string? UserEmail { get; set; }

        public byte[]? UserAvatar { get; set; }


        public User(string? userName, string? userPassword, string? userEmail, byte[]? userAvatar)
        {
            UserName = userName;
            UserPassword = userPassword;
            UserEmail = userEmail;
            UserAvatar = userAvatar;
        }
    }
}
