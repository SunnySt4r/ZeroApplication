using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Windows;
using ClassLibrary;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ConfigBuilder
{
    /// <summary>
    /// Interaction logic for AuthorizationWindow.xaml
    /// </summary>
    public partial class AuthorizationWindow : Window
    {
        public AuthorizationWindowType WindowType { get; private set; }
        public MainWindow Window { get; private set; }
        public AuthorizationWindow(MainWindow mainWindow, AuthorizationWindowType windowType)
        {
            InitializeComponent();
            Window = mainWindow;
            WindowType = windowType;
            if (windowType == AuthorizationWindowType.Registration)
            {
                Title = "Registration";
                AuthorizeButton.Content = "Зарегистрироваться";
            }
            else if (windowType == AuthorizationWindowType.Login)
            {
                Title = "Login";
                AuthorizeButton.Content = "Войти";
            }
        }

        private async void AuthorizeButton_Click(object sender, RoutedEventArgs e)
        {
            if (UsernameTextBox.Text.Length == 0 || PasswordTextBox.Text.Length == 0)
            {
                MessageBox.Show("Введите логин и пароль.", "Не все поля формы заполнены");
                return;
            }
            try
            {
                var data = new
                {
                    username = UsernameTextBox.Text,
                    password = PasswordTextBox.Text
                };
                string jsonData = JsonConvert.SerializeObject(data);
                string url = WindowType == AuthorizationWindowType.Registration
                    ? "http://91.210.169.254:8080/auth/reg"
                    : "http://91.210.169.254:8080/auth/login";
                string responseJSON = await PostRequestAsync(url, jsonData);
                JObject obj = JObject.Parse(responseJSON);
                string jwtToken = (string)obj["jwtToken"];
                Window.JWTToken = jwtToken;

                Window.HideAuthorizationButtonsAndShowConfigButtons();
                Close();
            }
            catch (Exception)
            {
                //MessageBox.Show($"Exception: {ex.Message}");
                if (WindowType == AuthorizationWindowType.Registration)
                {
                    MessageBox.Show("К сожалению, пользователь с таким именем уже существует\nПопробуйте другое", "Имя пользователя занято");
                }
                else
                {
                    MessageBox.Show("Проверьте введённые данные", "Указан неверный логин или пароль");
                }
            }
        }

        private static async Task<string> PostRequestAsync(string url, string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "C# HttpClient");
                // Формируем содержимое запроса (используем JSON)
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    // Читаем и возвращаем строку ответа
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    //throw new Exception($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    throw new Exception();
                }
            }
        }
    }
}
