using System;
using System.Diagnostics;
using System.Windows;

namespace ConfigBuilder
{
    /// <summary>
    /// Interaction logic for ConfigHyperlinkWindow.xaml
    /// </summary>
    public partial class ConfigHyperlinkWindow : Window
    {
        private MainWindow Window { get; set; }
        public ConfigHyperlinkWindow(MainWindow mainWindow, string message)
        {
            InitializeComponent();
            Hyperlink01.NavigateUri = new Uri(message);
            Window = mainWindow;
            Closing += ConfigHyperlinkWindow_Closing;
        }

        private void ConfigHyperlinkWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            Window.Close();
        }

        private void CloseProgramButton_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void Hyperlink_RequestNavigate(object sender, System.Windows.Navigation.RequestNavigateEventArgs e)
        {
            // Открываем ссылку в браузере по умолчанию
            Process.Start(new ProcessStartInfo(e.Uri.AbsoluteUri) { UseShellExecute = true });
            e.Handled = true;
        }
    }
}
