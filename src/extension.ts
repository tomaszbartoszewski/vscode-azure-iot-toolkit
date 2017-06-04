"use strict";
import * as vscode from "vscode";
import { AzureIoTExplorer } from "./azureIoTExplorer";
import { DeviceTree } from "./deviceTree";

export function activate(context: vscode.ExtensionContext) {
    let azureIoTExplorer = new AzureIoTExplorer(context);
    let deviceTree = new DeviceTree(context);

    vscode.window.registerTreeDataProvider("iotHubDevices", deviceTree);

    context.subscriptions.push(vscode.commands.registerCommand("azure-iot-toolkit.refreshDeviceTree", () => {
        deviceTree.refresh();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("azure-iot-toolkit.getDevice", (deviceId) => {
        azureIoTExplorer.getDevice(deviceId);
    }));

    let sendD2CMessage = vscode.commands.registerCommand("azure-iot-toolkit.sendD2CMessage", (DeviceItem) => {
        azureIoTExplorer.sendD2CMessage(DeviceItem);
    });

    let startMonitorIoTHubMessage = vscode.commands.registerCommand("azure-iot-toolkit.startMonitorIoTHubMessage", () => {
        azureIoTExplorer.startMonitorIoTHubMessage();
    });

    let stopMonitorIoTHubMessage = vscode.commands.registerCommand("azure-iot-toolkit.stopMonitorIoTHubMessage", () => {
        azureIoTExplorer.stopMonitorIoTHubMessage();
    });

    let sendC2DMessage = vscode.commands.registerCommand("azure-iot-toolkit.sendC2DMessage", () => {
        azureIoTExplorer.sendC2DMessage();
    });

    let startMonitorC2DMessage = vscode.commands.registerCommand("azure-iot-toolkit.startMonitorC2DMessage", () => {
        azureIoTExplorer.startMonitorC2DMessage();
    });

    let stopMonitorC2DMessage = vscode.commands.registerCommand("azure-iot-toolkit.stopMonitorC2DMessage", () => {
        azureIoTExplorer.stopMonitorC2DMessage();
    });

    let sendMessageToEventHub = vscode.commands.registerCommand("azure-iot-toolkit.sendMessageToEventHub", () => {
        azureIoTExplorer.sendMessageToEventHub();
    });

    let startMonitorEventHubMessage = vscode.commands.registerCommand("azure-iot-toolkit.startMonitorEventHubMessage", () => {
        azureIoTExplorer.startMonitorEventHubMessage();
    });

    let stopMonitorEventHubMessage = vscode.commands.registerCommand("azure-iot-toolkit.stopMonitorEventHubMessage", () => {
        azureIoTExplorer.stopMonitorEventHubMessage();
    });

    let listDevice = vscode.commands.registerCommand("azure-iot-toolkit.listDevice", () => {
        azureIoTExplorer.listDevice();
    });

    let createDevice = vscode.commands.registerCommand("azure-iot-toolkit.createDevice", async () => {
        await azureIoTExplorer.createDevice();
        setTimeout(() => { deviceTree.refresh(); }, 2000);
    });

    let deleteDevice = vscode.commands.registerCommand("azure-iot-toolkit.deleteDevice", async (DeviceItem) => {
        await azureIoTExplorer.deleteDevice(DeviceItem);
        setTimeout(() => { deviceTree.refresh(); }, 2000);
    });

    let discoverDevice = vscode.commands.registerCommand("azure-iot-toolkit.discoverDevice", () => {
        azureIoTExplorer.discoverDevice();
    });

    let deploy = vscode.commands.registerCommand("azure-iot-toolkit.deploy", () => {
        azureIoTExplorer.deploy();
    });

    let run = vscode.commands.registerCommand("azure-iot-toolkit.run", () => {
        azureIoTExplorer.run();
    });

    vscode.workspace.onDidChangeTextDocument((event) => azureIoTExplorer.replaceConnectionString(event));

    context.subscriptions.push(sendD2CMessage);
    context.subscriptions.push(startMonitorIoTHubMessage);
    context.subscriptions.push(stopMonitorIoTHubMessage);
    context.subscriptions.push(sendC2DMessage);
    context.subscriptions.push(startMonitorC2DMessage);
    context.subscriptions.push(stopMonitorC2DMessage);
    context.subscriptions.push(sendMessageToEventHub);
    context.subscriptions.push(startMonitorEventHubMessage);
    context.subscriptions.push(stopMonitorEventHubMessage);
    context.subscriptions.push(listDevice);
    context.subscriptions.push(createDevice);
    context.subscriptions.push(deleteDevice);
    context.subscriptions.push(discoverDevice);
    context.subscriptions.push(deploy);
    context.subscriptions.push(run);
}

export function deactivate() {
}
