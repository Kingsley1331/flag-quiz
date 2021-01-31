export const fetchData = async () => {
    const URL = "https://restcountries.eu/rest/v2/all";

    return await fetch(URL);
    // await data.json();
    // const dataJSON = await data.json();
    // console.log(dataJSON);

    // return dataJSON;
};
