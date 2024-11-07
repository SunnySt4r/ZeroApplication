package com.example.ZeroApplication.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class BatGeneratorService {
    public static String generateBatFile(String jsonContent) {
        StringBuilder batContent = new StringBuilder();
        try {
            com.google.gson.JsonObject jsonObject = JsonParser.parseString(jsonContent).getAsJsonObject();
            JsonArray sourcesArray = jsonObject.getAsJsonArray("Sources");
            for (JsonElement sourceElement : sourcesArray) {
                com.google.gson.JsonObject sourceObject = sourceElement.getAsJsonObject();
                JsonArray packagesArray = sourceObject.getAsJsonArray("Packages");
                for (JsonElement packageElement : packagesArray) {
                    com.google.gson.JsonObject packageObject = packageElement.getAsJsonObject();
                    String packageId = packageObject.get("PackageIdentifier").getAsString();
                    String version = packageObject.get("Version").getAsString();
                    String command = String.format("winget install  %s --version %s --silent --accept-package-agreements --accept-source-agreements", packageId, version);
                    batContent.append(command).append(System.lineSeparator());
                }
            }
        } catch (com.google.gson.JsonSyntaxException exception){
            System.out.println("Ошибка чтения jsonContent: " + exception.getMessage());
        }
        return batContent.toString();
    }
}