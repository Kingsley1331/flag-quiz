function nameFlagData(countryData) {
    const filteredData = countryData.map((country) => {
        return { name: country.name.common, flag: country.flags[0] };
    });

    return filteredData;
}

export default nameFlagData;
