import * as FileSystem from 'expo-file-system';

export async function dbInit() {
  await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}datasets.json`, JSON.stringify({ datasets: [] }));
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}datasets/`);
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}images/`);
}

export async function dbVerify() {
  const datasetsInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}datasets.json`);
  const datasetsDirectoryInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}datasets/`);
  const imagesInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}images/`);

  return (!datasetsInfo.isDirectory && datasetsDirectoryInfo.isDirectory && imagesInfo.isDirectory) && datasetsInfo.exists;
}

export async function dbReadDatasets() {
  return JSON.parse(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}datasets.json`));
}

export async function dbWriteDatasets(data) {
  await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}datasets.json`, JSON.stringify(data));
}

export async function dbIndex(name) {
  const data = await dbReadDatasets();

  for (let i = 0; i < data.datasets.length; i += 1) {
    if (data.datasets[i].name === name) {
      return i;
    }
  }

  return null;
}

export async function dbDeleteAtIndex(index) {
  const data = await dbReadDatasets();
  data.datasets.splice(index, 1);
  await dbWriteDatasets(data);
}

export async function dbDatasetFileExists(index) {
  const data = await dbReadDatasets();
  const { name } = data.datasets[index];
  const fileData = await FileSystem.getInfoAsync(`${FileSystem.documentDirectorydatasets}datasets/${name}.json`);
  return fileData.exists && !fileData.isDirectory;
}

export async function dbCopyImage(uri, file) {
  const fileTo = `${FileSystem.documentDirectory}images/${file}.jpg`;
  await FileSystem.copyAsync({ to: fileTo, from: uri });
}

export function dbImageURI(imageName) {
  return `${FileSystem.documentDirectory}images/${imageName}.jpg`;
}

export async function dbDeleteImage(datasetName, uri) {
  const data = await dbReadDatasets();
  const datasetIndex = await dbIndex(datasetName);

  let imageIndex;
  for (let i = 0; i < data.datasets[datasetIndex].images.length; i += 1) {
    if (data.datasets[datasetIndex].images[i].uri === uri) {
      imageIndex = i;
    }
  }

  data.datasets[datasetIndex].images.splice(imageIndex, 1);
  await dbWriteDatasets(data);

  if (await FileSystem.getInfoAsync(uri).exists) {
    await FileSystem.deleteAsync(dbImageURI(uri));
  }
}
