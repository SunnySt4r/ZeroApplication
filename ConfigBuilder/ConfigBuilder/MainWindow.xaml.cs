using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Security.AccessControl;

namespace ConfigBuilder
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void GetAllAppsButton_Click(object sender, RoutedEventArgs e)
        {
            string command = "winget export -o \"test.json\" --include-versions";

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


            SaveConfigButton.Visibility = Visibility.Visible;
            GetAllAppsButton.IsEnabled = false;
        }

        private async void SaveConfigButton_Click(object sender, RoutedEventArgs e)
        {
            string configFilePath = System.IO.Path.GetFullPath(Directory.GetCurrentDirectory() + @"\test.json");
            if (!File.Exists(configFilePath))
            {
                MessageBox.Show("Повторите сбор конфигурации", "Файл с конфигурацией не найден");
                GetAllAppsButton.IsEnabled = true;
                SaveConfigButton.Visibility = Visibility.Hidden;
            }
            else
            {
                using (FileStream file = File.OpenRead(configFilePath))
                {
                    using (StreamReader reader = new StreamReader(file))
                    {
                        string jsonData = reader.ReadToEnd();
                        MessageBox.Show(jsonData);
                        string response = await PostRequestAsync("https://bus.gov.ru", jsonData);
                        MessageBox.Show(response);
                    }
                }
            }
            //MessageBox.Show("Молодец, твои конфиги улетели на фронт)", "Топай на фронт!");
        }

        private static async Task<string> PostRequestAsync(string url, string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                try
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
                        throw new Exception($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    }
                }
                catch (Exception ex)
                {
                    return $"Exception: {ex.Message}";
                }
            }
        }
    }
}
