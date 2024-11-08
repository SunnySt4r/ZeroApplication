﻿using System;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using ClassLibrary;

namespace ConfigBuilder
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public string JWTToken { get; set; }
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void GetAllAppsButton_Click(object sender, RoutedEventArgs e)
        {
            string command = "winget export -o \"test.json\" --include-versions";

            ProgressBar1.Visibility = Visibility.Visible;
            await Task.Run(() => ExecutePowerShellCommand(command));
            ProgressBar1.Visibility = Visibility.Hidden;

            SaveConfigButton.Visibility = Visibility.Visible;
            GetAllAppsButton.IsEnabled = false;
        }

        private void ExecutePowerShellCommand(string command)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = $"-Command \"{command}\"",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                Verb = "runas"
            };
            try
            {
                using (Process process = Process.Start(startInfo))
                {
                    process.StandardInput.WriteLine("Y");
                    string output = process.StandardOutput.ReadToEnd();
                    string error = process.StandardError.ReadToEnd();
                    process.WaitForExit();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}");
            }
        }

        private async void SaveConfigButton_Click(object sender, RoutedEventArgs e)
        {
            string configFilePath = Path.GetFullPath(Directory.GetCurrentDirectory() + @"\test.json");
            if (!File.Exists(configFilePath))
            {
                MessageBox.Show("Повторите сбор конфигурации", "Файл с конфигурацией не найден");
                GetAllAppsButton.IsEnabled = true;
                SaveConfigButton.Visibility = Visibility.Hidden;
            }
            else
            {
                string jsonData = string.Empty;
                using (FileStream file = File.OpenRead(configFilePath))
                {
                    using (StreamReader reader = new StreamReader(file))
                    {
                        jsonData = reader.ReadToEnd();
                    }
                }
                try
                {
                    string responseJSON = await PostRequestAsync("http://91.210.169.254:8080/file/", jsonData, JWTToken);
                    JObject obj = JObject.Parse(responseJSON);
                    string uuid = (string)obj["uuid"];
                    ConfigHyperlinkWindow configHyperlinkWindow = new ConfigHyperlinkWindow(this, $"http://91.210.169.254:3000/config?uuid={uuid}");
                    configHyperlinkWindow.ShowDialog();
                }
                catch
                {
                    MessageBox.Show("Попробуйте ещё раз!", "Oooops, something went wrong");
                }
            }
        }

        private static async Task<string> PostRequestAsync(string url, string jsonData, string jwtToken)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "C# HttpClient");
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {jwtToken}");
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
                    throw new Exception($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
        }

        private void RegistrationButton_Click(object sender, RoutedEventArgs e)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow(this, AuthorizationWindowType.Registration);
            authorizationWindow.ShowDialog();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow(this, AuthorizationWindowType.Login);
            authorizationWindow.ShowDialog();
        }

        public void HideAuthorizationButtonsAndShowConfigButtons()
        {
            RegistrationButton.Visibility = Visibility.Hidden;
            LoginButton.Visibility = Visibility.Hidden;
            GetAllAppsButton.Visibility = Visibility.Visible;
        }
    }
}
