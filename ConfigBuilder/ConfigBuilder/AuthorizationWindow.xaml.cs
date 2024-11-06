using System.Windows;
using ClassLibrary;

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

        private void AuthorizeButton_Click(object sender, RoutedEventArgs e)
        {
            // Что-то с запросами и JWT-токенами
            //<<< in progresss >>>

            Window.HideAuthorizationButtonsAndShowConfigButtons();
            Close();
        }
    }
}
