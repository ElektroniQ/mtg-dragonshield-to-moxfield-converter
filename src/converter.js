import Papa from "papaparse";

const convert = (file, setTxt, setCsv) => {
    if (!!file) {
        let reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = function() {
            const text = reader.result.slice(reader.result.search("\n") +1)
            console.log(text);  // prints file contents
            const jsonData = Papa.parse(text, {header: true, skipEmptyLines: true});
            console.log(jsonData);

            const foilDict = {
                "Normal" : "",
                "Etched Foil" : "etched",
                "Foil": "foil"
            }

            const a = jsonData.data.map(o => {
                return `${o['Quantity']} ${o['Card Name']} (${o['Set Code']}) ${o['Card Number']}`;
                // return {
                //     "Count": o['Quantity'],
                //     "Name": o['Card Name'],
                //     "Edition": !!o['Set Code'] ? o['Set Code'].toLowerCase() : "",
                //     "Condition": !!o['Condition'] ? o['Condition'].match(/[A-Z][a-z]+/g).join(" ") : "",
                //     "Language": o['Language'],
                //     "Foil": foilDict[o['Printing']],
                //     "Collector Number": o['Card Number'],
                // }
            })

            const b = jsonData.data.map(o => {
                return {
                    "Count": o['Quantity'],
                    "Name": o['Card Name'],
                    "Edition": !!o['Set Code'] ? o['Set Code'].toLowerCase() : "",
                    "Condition": !!o['Condition'] ? o['Condition'].match(/[A-Z][a-z]+/g).join(" ") : "",
                    "Language": o['Language'],
                    "Foil": foilDict[o['Printing']],
                    "Collector Number": o['Card Number'],
                }
            })
            const c = Papa.unparse(b, {quotes: true});
            console.log(c);
            console.log(a.join("\r\n"));
            if(!!setTxt)
                setTxt(a.join("\r\n"));

            if(!!setCsv)
                setCsv(c);

        };       
    }
    else
    {
        setTxt("");
        setCsv("");
    }
}

export default convert;