import * as FileSystem from 'expo-file-system';

export async function dbInit(){
    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'datasets.json', JSON.stringify( {"datasets":[]} ));
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'datasets/');
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images/');
}

export async function dbVerify(){
    let datasetsInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'datasets.json');
    let datasetsDirectoryInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'datasets/');
    let imagesInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'images/');

    return (!datasetsInfo.isDirectory && datasetsDirectoryInfo.isDirectory && imagesInfo.isDirectory) && datasetsInfo.exists
}

export async function dbReadDatasets() {
    return JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'datasets.json'));
}

export async function dbWriteDatasets(data){
    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'datasets.json', JSON.stringify( data ));
}

export async function dbIndex(name){
    let data = await dbReadDatasets();

    for(let i = 0; i < data.datasets.length; i++){
        if(data.datasets[i].name == name){
            return i
        }
    }

    return null;
}

export async function dbDeleteAtIndex(index){
    let data = await dbReadDatasets();
    data.datasets.splice(index, 1);
    await dbWriteDatasets(data);
}

export async function dbDatasetFileExists(index){
    let data = await dbReadDatasets();
    let name = data.datasets[index].name;
    let fileData = await FileSystem.getInfoAsync(`${FileSystem.documentDirectorydatasets}datasets/${name}.json`);
    return fileData.exists && !fileData.isDirectory;
}

export async function dbReadDataset(index){
    let data = await dbReadDatasets();
    let name = data.datasets[index].name;
    return await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}datasets/${name}.json`);
}

export async function dbCopyImage(uri, fileTo){
    fileTo = `${FileSystem.documentDirectory}images/${fileTo}`;
    console.log(fileTo);
    try{
        await FileSystem.copyAsync({to: fileTo, from: uri});
    } catch (error){
        console.error(error);
    }
}

export function dbImageURI(imageName){
    return `${FileSystem.documentDirectory}images/${imageName}`;
}