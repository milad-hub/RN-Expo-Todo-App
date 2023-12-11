import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const DBScreen = () => {
    const [db, setDb] = useState(SQLite.openDatabase('todo-app.db'));

    const exportDb = async () => {
        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(
                    FileSystem.documentDirectory + 'SQLite/todo-app.db',
                    {
                        encoding: FileSystem.EncodingType.Base64
                    }
                );

                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'todo-app.db', 'application/octet-stream')
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                    })
                    .catch((e) => console.log(e));
            } else {
                console.log("Permission not granted");
            }
        } else {
            await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/todo-app.db');
        }
    };

    const importDb = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: true
            });

            const dataUri = result.assets[0].uri;

            if (dataUri) {

                const base64 = await FileSystem.readAsStringAsync(
                    dataUri,
                    {
                        encoding: FileSystem.EncodingType.Base64
                    }
                );

                if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
                    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
                }

                await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/todo-app.db', base64, { encoding: FileSystem.EncodingType.Base64 });

                await db.closeAsync();

                setDb(SQLite.openDatabase('todo-app.db'));
            } else if (result.type === 'cancel') {
                console.log('User canceled document selection');
            } else {
                console.log('No document selected or an error occurred');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'royalblue' }]} onPress={importDb}>
                <Text style={styles.buttonText}>Import Database</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'royalblue', marginTop: 10 }]} onPress={exportDb}>
                <Text style={styles.buttonText}>Export Database</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'royalblue',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default DBScreen;