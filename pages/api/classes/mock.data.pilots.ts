export const mockXmlWithoutViolators = '<report>\n' +
    '<deviceInformation deviceId="GUARDB1RD">\n' +
    '<listenRange>500000</listenRange>\n' +
    '<deviceStarted>2022-12-18T16:41:55.751Z</deviceStarted>\n' +
    '<uptimeSeconds>11181</uptimeSeconds>\n' +
    '<updateIntervalMs>2000</updateIntervalMs>\n' +
    '</deviceInformation>\n' +
    '<capture snapshotTimestamp="2022-12-18T19:48:16.956Z">\n' +
    '<drone>\n' +
    '<serialNumber>SN-6TYm7A2JEn</serialNumber>\n' +
    '<model>Mosquito</model>\n' +
    '<manufacturer>MegaBuzzer Corp</manufacturer>\n' +
    '<mac>0e:ca:12:ec:a8:35</mac>\n' +
    '<ipv4>21.219.116.45</ipv4>\n' +
    '<ipv6>df6f:1400:bc1a:f7b3:d345:b1ee:c3bd:3f39</ipv6>\n' +
    '<firmware>7.7.0</firmware>\n' +
    '<positionY>30972.297163942374</positionY>\n' +
    '<positionX>165314.46012279243</positionX>\n' +
    '<altitude>4119.562140996533</altitude>\n' +
    '</drone>\n' +
    '<drone>\n' +
    '<serialNumber>SN-Ga3emVTM85</serialNumber>\n' +
    '<model>Eagle</model>\n' +
    '<manufacturer>MegaBuzzer Corp</manufacturer>\n' +
    '<mac>0d:70:fc:fe:5c:88</mac>\n' +
    '<ipv4>195.48.73.57</ipv4>\n' +
    '<ipv6>fcf3:3335:d7f7:fa59:6a0e:9144:05b0:276e</ipv6>\n' +
    '<firmware>7.2.2</firmware>\n' +
    '<positionY>94912.43075777449</positionY>\n' +
    '<positionX>265415.3220634618</positionX>\n' +
    '<altitude>4899.690181228342</altitude>\n' +
    '</drone>\n' +
    '<drone>\n' +
    '<serialNumber>SN-XkgkZNrFZG</serialNumber>\n' +
    '<model>HRP-DRP 1 Pro</model>\n' +
    '<manufacturer>ProDröne Ltd</manufacturer>\n' +
    '<mac>ec:2f:b0:8a:26:75</mac>\n' +
    '<ipv4>226.187.188.38</ipv4>\n' +
    '<ipv6>1efd:097e:2e75:04c0:f8e2:70e0:fd7d:6dd7</ipv6>\n' +
    '<firmware>9.7.8</firmware>\n' +
    '<positionY>138526.8609105739</positionY>\n' +
    '<positionX>214833.06817310728</positionX>\n' +
    '<altitude>4419.376322806358</altitude>\n' +
    '</drone>\n' +
    '</capture>\n' +
    '</report>';

export const mockXmlWithViolators = '<report>\n' +
    '<deviceInformation deviceId="GUARDB1RD">\n' +
    '<listenRange>500000</listenRange>\n' +
    '<deviceStarted>2022-12-18T16:41:55.751Z</deviceStarted>\n' +
    '<uptimeSeconds>11181</uptimeSeconds>\n' +
    '<updateIntervalMs>2000</updateIntervalMs>\n' +
    '</deviceInformation>\n' +
    '<capture snapshotTimestamp="2022-12-18T19:48:16.956Z">\n' +
    '<drone>\n' +
    '<serialNumber>SN-6TYm7A2JEn</serialNumber>\n' +
    '<model>Mosquito</model>\n' +
    '<manufacturer>MegaBuzzer Corp</manufacturer>\n' +
    '<mac>0e:ca:12:ec:a8:35</mac>\n' +
    '<ipv4>21.219.116.45</ipv4>\n' +
    '<ipv6>df6f:1400:bc1a:f7b3:d345:b1ee:c3bd:3f39</ipv6>\n' +
    '<firmware>7.7.0</firmware>\n' +
    '<positionY>277122.918427297</positionY>\n' +
    '<positionX>335669.96213563567</positionX>\n' +
    '<altitude>4119.562140996533</altitude>\n' +
    '</drone>\n' +
    '<drone>\n' +
    '<serialNumber>SN-Ga3emVTM85</serialNumber>\n' +
    '<model>Eagle</model>\n' +
    '<manufacturer>MegaBuzzer Corp</manufacturer>\n' +
    '<mac>0d:70:fc:fe:5c:88</mac>\n' +
    '<ipv4>195.48.73.57</ipv4>\n' +
    '<ipv6>fcf3:3335:d7f7:fa59:6a0e:9144:05b0:276e</ipv6>\n' +
    '<firmware>7.2.2</firmware>\n' +
    '<positionY>189246.36693049452</positionY>\n' +
    '<positionX>187168.94545655686</positionX>\n' +
    '<altitude>4899.690181228342</altitude>\n' +
    '</drone>\n' +
    '<drone>\n' +
    '<serialNumber>SN-XkgkZNrFZG</serialNumber>\n' +
    '<model>HRP-DRP 1 Pro</model>\n' +
    '<manufacturer>ProDröne Ltd</manufacturer>\n' +
    '<mac>ec:2f:b0:8a:26:75</mac>\n' +
    '<ipv4>226.187.188.38</ipv4>\n' +
    '<ipv6>1efd:097e:2e75:04c0:f8e2:70e0:fd7d:6dd7</ipv6>\n' +
    '<firmware>9.7.8</firmware>\n' +
    '<positionY>317744.94565795804</positionY>\n' +
    '<positionX>296072.17258878995</positionX>\n' +
    '<altitude>4419.376322806358</altitude>\n' +
    '</drone>\n' +
    '</capture>\n' +
    '</report>';

export const mockJsonViolators = {
    pilotId: "P-tKIx1XAwwU",
    firstName: "Asia",
    lastName: "Lindgren",
    phoneNumber: "+210653922568",
    createdDt: "2022-09-16T14:44:02.991Z",
    email: "asia.lindgren@example.com"
};

export const mockPilot = {
    positionX: 296072.17258878995,
    positionY: 317744.94565795804,
    newDistance: 50,
    serialNumber: 'SN-XkgkZNrFZG',
};

export const mockResponseJsonGetDrones = [
    {
        altitude: 4119.562140996533,
        firmware: "7.7.0",
        ipv4: "21.219.116.45",
        ipv6: "df6f:1400:bc1a:f7b3:d345:b1ee:c3bd:3f39",
        mac: "0e:ca:12:ec:a8:35",
        manufacturer: "MegaBuzzer Corp",
        model: "Mosquito",
        newDistance: 89.87,
        positionX: 335669.96213563567,
        positionY: 277122.918427297,
        serialNumber: "SN-6TYm7A2JEn",
    },
    {
        altitude: 4899.690181228342,
        firmware: "7.2.2",
        ipv4: "195.48.73.57",
        ipv6: "fcf3:3335:d7f7:fa59:6a0e:9144:05b0:276e",
        mac: "0d:70:fc:fe:5c:88",
        manufacturer: "MegaBuzzer Corp",
        model: "Eagle",
        newDistance: 87.4,
        positionX: 187168.94545655686,
        positionY: 189246.36693049452,
        serialNumber: "SN-Ga3emVTM85",
    },
    {
        altitude: 4419.376322806358,
        firmware: "9.7.8",
        ipv4: "226.187.188.38",
        ipv6: "1efd:097e:2e75:04c0:f8e2:70e0:fd7d:6dd7",
        mac: "ec:2f:b0:8a:26:75",
        manufacturer: "ProDröne Ltd",
        model: "HRP-DRP 1 Pro",
        newDistance: 81.93,
        positionX: 296072.17258878995,
        positionY: 317744.94565795804,
        serialNumber: "SN-XkgkZNrFZG",
    }
];
