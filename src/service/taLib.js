import talib from 'talib';

function processData(stockData){
    let marketData = {open:[], high:[], low:[], close:[],volume:[]}
    stockData.map(el=>{
          marketData.open.push(el.open)
          marketData.high.push(el.high)
          marketData.low.push(el.low)
          marketData.close.push(el.close)
          marketData.volume.push(el.volume)
    })
    return marketData;
}

function SMA(stockData, lineTime){
  const marketData = processData(stockData);

  var indicatorParams = {
    name: "SMA",
    startIdx: 0,
    endIdx: marketData.close.length - 1,
    inReal: marketData.close,
    optInTimePeriod: lineTime,
  };
  
  talib.execute(indicatorParams, function (err, result) {
    if (err) {
      console.error("Error:", err);
    } else {
      return result;
    }
  });
}

function WMA(stockData, lineTime){
    const marketData = processData(stockData);
    var indicatorParams = {
        name: "WMA",
        startIdx: 0,
        endIdx: marketData.close.length - 1,
        inReal: marketData.close,
        optInTimePeriod: lineTime,
    };
    talib.execute(indicatorParams, function (err, result) {
        if (err) {
          console.error("Error:", err);
        } else {
            console.log(result);
            return result;
        }
      });
}

function BBANDS(stockData, lineTime, stdev){
    const marketData = processData(stockData);
    var indicatorParams = {
        name: "BBANDS",
        startIdx: 0,
        endIdx: marketData.close.length - 1,
        inReal: marketData.close,
        optInTimePeriod: lineTime,
        optInNbDevUp: stdev,
        optInNbDevDn: stdev,
        optInMAType: 0,
    };
    talib.execute(indicatorParams, function (err, result) {
        if (err) {
          console.error("Error:", err);
        } else {
          return result;
        }
      });
}

WMA(
    [
        {
            "open": 60600,
            "close": 60000,
            "high": 60700,
            "low": 59600,
            "volume": 18251170,
            "date": "20220809"
        },
        {
            "open": 61400,
            "close": 60800,
            "high": 61400,
            "low": 60600,
            "volume": 11313150,
            "date": "20220808"
        },
        {
            "open": 61700,
            "close": 61500,
            "high": 61900,
            "low": 61200,
            "volume": 9567620,
            "date": "20220805"
        },
        {
            "open": 61700,
            "close": 61500,
            "high": 61800,
            "low": 61200,
            "volume": 9125439,
            "date": "20220804"
        },
        {
            "open": 61600,
            "close": 61300,
            "high": 61600,
            "low": 61000,
            "volume": 10053861,
            "date": "20220803"
        },
        {
            "open": 61200,
            "close": 61700,
            "high": 61900,
            "low": 61000,
            "volume": 13614895,
            "date": "20220802"
        },
        {
            "open": 61000,
            "close": 61300,
            "high": 61700,
            "low": 60300,
            "volume": 13154816,
            "date": "20220801"
        },
        {
            "open": 62400,
            "close": 61400,
            "high": 62600,
            "low": 61300,
            "volume": 15093120,
            "date": "20220729"
        },
        {
            "open": 62300,
            "close": 61900,
            "high": 62600,
            "low": 61600,
            "volume": 10745302,
            "date": "20220728"
        },
        {
            "open": 61300,
            "close": 61800,
            "high": 61900,
            "low": 61200,
            "volume": 7320997,
            "date": "20220727"
        },
        {
            "open": 60800,
            "close": 61700,
            "high": 61900,
            "low": 60800,
            "volume": 6597211,
            "date": "20220726"
        },
        {
            "open": 60900,
            "close": 61100,
            "high": 61900,
            "low": 60800,
            "volume": 9193681,
            "date": "20220725"
        },
        {
            "open": 61800,
            "close": 61300,
            "high": 62200,
            "low": 61200,
            "volume": 10261310,
            "date": "20220722"
        },
        {
            "open": 61100,
            "close": 61800,
            "high": 61900,
            "low": 60700,
            "volume": 12291374,
            "date": "20220721"
        },
        {
            "open": 61800,
            "close": 60500,
            "high": 62100,
            "low": 60500,
            "volume": 16782238,
            "date": "20220720"
        },
        {
            "open": 61400,
            "close": 60900,
            "high": 61500,
            "low": 60200,
            "volume": 15248261,
            "date": "20220719"
        },
        {
            "open": 60600,
            "close": 61900,
            "high": 62000,
            "low": 60500,
            "volume": 20832517,
            "date": "20220718"
        },
        {
            "open": 58400,
            "close": 60000,
            "high": 60000,
            "low": 58100,
            "volume": 18685583,
            "date": "20220715"
        },
        {
            "open": 57500,
            "close": 57500,
            "high": 58200,
            "low": 57400,
            "volume": 15067012,
            "date": "20220714"
        },
        {
            "open": 58300,
            "close": 58000,
            "high": 58600,
            "low": 58000,
            "volume": 10841315,
            "date": "20220713"
        },
        {
            "open": 58600,
            "close": 58100,
            "high": 58700,
            "low": 58100,
            "volume": 9336061,
            "date": "20220712"
        },
        {
            "open": 59300,
            "close": 58800,
            "high": 59600,
            "low": 58700,
            "volume": 13042624,
            "date": "20220711"
        },
        {
            "open": 58600,
            "close": 58700,
            "high": 59300,
            "low": 58200,
            "volume": 15339271,
            "date": "20220708"
        },
        {
            "open": 56400,
            "close": 58200,
            "high": 58700,
            "low": 56300,
            "volume": 21322833,
            "date": "20220707"
        },
        {
            "open": 57300,
            "close": 56400,
            "high": 57300,
            "low": 56400,
            "volume": 16820461,
            "date": "20220706"
        },
        {
            "open": 57600,
            "close": 57200,
            "high": 58200,
            "low": 57200,
            "volume": 14216539,
            "date": "20220705"
        },
        {
            "open": 56100,
            "close": 57100,
            "high": 57400,
            "low": 55700,
            "volume": 17807126,
            "date": "20220704"
        },
        {
            "open": 56900,
            "close": 56200,
            "high": 57500,
            "low": 55900,
            "volume": 24982097,
            "date": "20220701"
        },
        {
            "open": 57200,
            "close": 57000,
            "high": 57600,
            "low": 57000,
            "volume": 18915142,
            "date": "20220630"
        },
        {
            "open": 58500,
            "close": 58000,
            "high": 58800,
            "low": 58000,
            "volume": 14677138,
            "date": "20220629"
        },
        {
            "open": 59200,
            "close": 59400,
            "high": 59500,
            "low": 58700,
            "volume": 13540538,
            "date": "20220628"
        },
        {
            "open": 59000,
            "close": 58800,
            "high": 59900,
            "low": 58300,
            "volume": 18122236,
            "date": "20220627"
        },
        {
            "open": 57900,
            "close": 58400,
            "high": 59100,
            "low": 57700,
            "volume": 23256103,
            "date": "20220624"
        },
        {
            "open": 57700,
            "close": 57400,
            "high": 58000,
            "low": 56800,
            "volume": 28338608,
            "date": "20220623"
        },
        {
            "open": 59000,
            "close": 57600,
            "high": 59100,
            "low": 57600,
            "volume": 23334687,
            "date": "20220622"
        },
        {
            "open": 58700,
            "close": 58500,
            "high": 59200,
            "low": 58200,
            "volume": 25148109,
            "date": "20220621"
        },
        {
            "open": 59800,
            "close": 58700,
            "high": 59900,
            "low": 58100,
            "volume": 34111306,
            "date": "20220620"
        },
        {
            "open": 59400,
            "close": 59800,
            "high": 59900,
            "low": 59400,
            "volume": 29053450,
            "date": "20220617"
        },
        {
            "open": 61300,
            "close": 60900,
            "high": 61800,
            "low": 60500,
            "volume": 23394895,
            "date": "20220616"
        },
        {
            "open": 61300,
            "close": 60700,
            "high": 61500,
            "low": 60200,
            "volume": 26811224,
            "date": "20220615"
        },
        {
            "open": 61200,
            "close": 61900,
            "high": 62200,
            "low": 61100,
            "volume": 24606419,
            "date": "20220614"
        },
        {
            "open": 62400,
            "close": 62100,
            "high": 62800,
            "low": 62100,
            "volume": 22157816,
            "date": "20220613"
        },
        {
            "open": 64000,
            "close": 63800,
            "high": 64400,
            "low": 63800,
            "volume": 22193552,
            "date": "20220610"
        },
        {
            "open": 65100,
            "close": 65200,
            "high": 65200,
            "low": 64500,
            "volume": 25790725,
            "date": "20220609"
        },
        {
            "open": 65400,
            "close": 65300,
            "high": 65700,
            "low": 65300,
            "volume": 12483180,
            "date": "20220608"
        },
        {
            "open": 66200,
            "close": 65500,
            "high": 66400,
            "low": 65400,
            "volume": 19355755,
            "date": "20220607"
        },
        {
            "open": 67200,
            "close": 66800,
            "high": 67300,
            "low": 66800,
            "volume": 8222883,
            "date": "20220603"
        },
        {
            "open": 66600,
            "close": 66700,
            "high": 67000,
            "low": 66400,
            "volume": 14959443,
            "date": "20220602"
        },
        {
            "open": 67500,
            "close": 67400,
            "high": 67500,
            "low": 66700,
            "volume": 24365002,
            "date": "20220531"
        },
        {
            "open": 67500,
            "close": 67700,
            "high": 67800,
            "low": 66900,
            "volume": 14255484,
            "date": "20220530"
        },
        {
            "open": 66700,
            "close": 66500,
            "high": 66900,
            "low": 66200,
            "volume": 11405555,
            "date": "20220527"
        },
        {
            "open": 66300,
            "close": 65900,
            "high": 67200,
            "low": 65500,
            "volume": 15970890,
            "date": "20220526"
        },
        {
            "open": 66700,
            "close": 66400,
            "high": 67100,
            "low": 65900,
            "volume": 15150490,
            "date": "20220525"
        },
        {
            "open": 67500,
            "close": 66500,
            "high": 67700,
            "low": 66500,
            "volume": 15482576,
            "date": "20220524"
        },
        {
            "open": 68800,
            "close": 67900,
            "high": 68800,
            "low": 67600,
            "volume": 13684088,
            "date": "20220523"
        },
        {
            "open": 67800,
            "close": 68000,
            "high": 68400,
            "low": 67700,
            "volume": 12109671,
            "date": "20220520"
        },
        {
            "open": 66500,
            "close": 67500,
            "high": 67600,
            "low": 66500,
            "volume": 17073727,
            "date": "20220519"
        },
        {
            "open": 68300,
            "close": 68100,
            "high": 68700,
            "low": 67600,
            "volume": 16486319,
            "date": "20220518"
        },
        {
            "open": 66600,
            "close": 67600,
            "high": 67900,
            "low": 66600,
            "volume": 15680447,
            "date": "20220517"
        },
        {
            "open": 67100,
            "close": 66300,
            "high": 67400,
            "low": 66100,
            "volume": 11937555,
            "date": "20220516"
        },
        {
            "open": 65300,
            "close": 66500,
            "high": 66700,
            "low": 65200,
            "volume": 14551536,
            "date": "20220513"
        },
        {
            "open": 65200,
            "close": 64900,
            "high": 65500,
            "low": 64900,
            "volume": 16414188,
            "date": "20220512"
        },
        {
            "open": 65500,
            "close": 65700,
            "high": 66300,
            "low": 65200,
            "volume": 12330920,
            "date": "20220511"
        },
        {
            "open": 65900,
            "close": 65700,
            "high": 66300,
            "low": 65300,
            "volume": 17235605,
            "date": "20220510"
        },
        {
            "open": 66300,
            "close": 66100,
            "high": 66900,
            "low": 66100,
            "volume": 11858736,
            "date": "20220509"
        },
        {
            "open": 67000,
            "close": 66500,
            "high": 67100,
            "low": 66500,
            "volume": 14356156,
            "date": "20220506"
        },
        {
            "open": 68000,
            "close": 67900,
            "high": 68400,
            "low": 67500,
            "volume": 11505248,
            "date": "20220504"
        },
        {
            "open": 67400,
            "close": 67500,
            "high": 68400,
            "low": 67300,
            "volume": 14168875,
            "date": "20220503"
        },
        {
            "open": 66600,
            "close": 67300,
            "high": 67600,
            "low": 66500,
            "volume": 14106184,
            "date": "20220502"
        },
        {
            "open": 65100,
            "close": 67400,
            "high": 67600,
            "low": 65000,
            "volume": 26190390,
            "date": "20220429"
        },
        {
            "open": 65400,
            "close": 64800,
            "high": 65500,
            "low": 64500,
            "volume": 16895527,
            "date": "20220428"
        },
        {
            "open": 65400,
            "close": 65000,
            "high": 65500,
            "low": 64900,
            "volume": 18122084,
            "date": "20220427"
        },
        {
            "open": 66400,
            "close": 66100,
            "high": 66700,
            "low": 66100,
            "volume": 12946923,
            "date": "20220426"
        },
        {
            "open": 66500,
            "close": 66300,
            "high": 66700,
            "low": 66300,
            "volume": 11016474,
            "date": "20220425"
        },
        {
            "open": 67200,
            "close": 67000,
            "high": 67300,
            "low": 66700,
            "volume": 11791478,
            "date": "20220422"
        },
        {
            "open": 67600,
            "close": 67700,
            "high": 68300,
            "low": 67500,
            "volume": 12847448,
            "date": "20220421"
        },
        {
            "open": 67000,
            "close": 67400,
            "high": 67400,
            "low": 66500,
            "volume": 16693293,
            "date": "20220420"
        },
        {
            "open": 67100,
            "close": 67300,
            "high": 68000,
            "low": 67000,
            "volume": 12959434,
            "date": "20220419"
        },
        {
            "open": 66500,
            "close": 66700,
            "high": 67100,
            "low": 66100,
            "volume": 10119203,
            "date": "20220418"
        },
        {
            "open": 67200,
            "close": 66600,
            "high": 67300,
            "low": 66500,
            "volume": 13176415,
            "date": "20220415"
        },
        {
            "open": 68700,
            "close": 67500,
            "high": 68700,
            "low": 67500,
            "volume": 16409494,
            "date": "20220414"
        },
        {
            "open": 67300,
            "close": 68700,
            "high": 69000,
            "low": 67200,
            "volume": 17378619,
            "date": "20220413"
        },
        {
            "open": 67600,
            "close": 67000,
            "high": 67700,
            "low": 67000,
            "volume": 13924389,
            "date": "20220412"
        },
        {
            "open": 67800,
            "close": 67900,
            "high": 68100,
            "low": 67400,
            "volume": 12263735,
            "date": "20220411"
        },
        {
            "open": 68100,
            "close": 67800,
            "high": 68300,
            "low": 67700,
            "volume": 15453191,
            "date": "20220408"
        },
        {
            "open": 68500,
            "close": 68000,
            "high": 68500,
            "low": 68000,
            "volume": 20683327,
            "date": "20220407"
        },
        {
            "open": 68600,
            "close": 68500,
            "high": 68800,
            "low": 68500,
            "volume": 15517308,
            "date": "20220406"
        },
        {
            "open": 69400,
            "close": 69200,
            "high": 69600,
            "low": 69100,
            "volume": 8467248,
            "date": "20220405"
        },
        {
            "open": 68900,
            "close": 69300,
            "high": 69300,
            "low": 68600,
            "volume": 11107905,
            "date": "20220404"
        },
        {
            "open": 69500,
            "close": 69100,
            "high": 69500,
            "low": 69000,
            "volume": 15916846,
            "date": "20220401"
        },
        {
            "open": 69900,
            "close": 69600,
            "high": 70200,
            "low": 69600,
            "volume": 12510366,
            "date": "20220331"
        },
        {
            "open": 70300,
            "close": 69900,
            "high": 70500,
            "low": 69800,
            "volume": 12670187,
            "date": "20220330"
        },
        {
            "open": 70000,
            "close": 70200,
            "high": 70300,
            "low": 69800,
            "volume": 13686208,
            "date": "20220329"
        },
        {
            "open": 69500,
            "close": 69700,
            "high": 69900,
            "low": 69200,
            "volume": 12619289,
            "date": "20220328"
        },
        {
            "open": 70100,
            "close": 69800,
            "high": 70200,
            "low": 69600,
            "volume": 12986010,
            "date": "20220325"
        },
        {
            "open": 69600,
            "close": 69800,
            "high": 70300,
            "low": 69600,
            "volume": 37943357,
            "date": "20220324"
        },
        {
            "open": 70600,
            "close": 70500,
            "high": 71200,
            "low": 70300,
            "volume": 12398025,
            "date": "20220323"
        },
        {
            "open": 69900,
            "close": 70300,
            "high": 70500,
            "low": 69900,
            "volume": 9402666,
            "date": "20220322"
        },
        {
            "open": 70900,
            "close": 69900,
            "high": 71000,
            "low": 69900,
            "volume": 11169002,
            "date": "20220321"
        },
        {
            "open": 70600,
            "close": 70700,
            "high": 70900,
            "low": 70200,
            "volume": 14410038,
            "date": "20220318"
        }
    ],5
);