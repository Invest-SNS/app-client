import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChartData, getMinuteData } from '../../../lib/apis/chart'

const initialState = {
  // default : 삼성전자
  datas: [
    {
        "open": 67000,
        "close": 66700,
        "high": 67900,
        "low": 66700,
        "volume": 15517624,
        "date": "20231026"
    },
    {
        "open": 67100,
        "close": 67300,
        "high": 67300,
        "low": 66700,
        "volume": 11334726,
        "date": "20231027"
    },
    {
        "open": 66800,
        "close": 67300,
        "high": 67800,
        "low": 66700,
        "volume": 10139270,
        "date": "20231030"
    },
    {
        "open": 67600,
        "close": 66900,
        "high": 68300,
        "low": 66900,
        "volume": 14488892,
        "date": "20231031"
    },
    {
        "open": 67500,
        "close": 68600,
        "high": 68900,
        "low": 67300,
        "volume": 13775256,
        "date": "20231101"
    },
    {
        "open": 70000,
        "close": 69700,
        "high": 70000,
        "low": 69400,
        "volume": 16350031,
        "date": "20231102"
    },
    {
        "open": 69700,
        "close": 69600,
        "high": 70200,
        "low": 69500,
        "volume": 10322234,
        "date": "20231103"
    },
    {
        "open": 69800,
        "close": 70900,
        "high": 70900,
        "low": 69300,
        "volume": 22228488,
        "date": "20231106"
    },
    {
        "open": 70600,
        "close": 70900,
        "high": 70900,
        "low": 70000,
        "volume": 17228732,
        "date": "20231107"
    },
    {
        "open": 71300,
        "close": 69900,
        "high": 71400,
        "low": 69700,
        "volume": 12901310,
        "date": "20231108"
    },
    {
        "open": 69900,
        "close": 70300,
        "high": 70800,
        "low": 69600,
        "volume": 12301373,
        "date": "20231109"
    },
    {
        "open": 70000,
        "close": 70500,
        "high": 70500,
        "low": 69500,
        "volume": 9684347,
        "date": "20231110"
    },
    {
        "open": 71300,
        "close": 70400,
        "high": 71300,
        "low": 70300,
        "volume": 9246919,
        "date": "20231113"
    },
    {
        "open": 71000,
        "close": 70800,
        "high": 71100,
        "low": 70600,
        "volume": 9567984,
        "date": "20231114"
    },
    {
        "open": 71600,
        "close": 72200,
        "high": 72200,
        "low": 71500,
        "volume": 20148676,
        "date": "20231115"
    },
    {
        "open": 72500,
        "close": 72800,
        "high": 73000,
        "low": 72300,
        "volume": 15860451,
        "date": "20231116"
    },
    {
        "open": 72300,
        "close": 72500,
        "high": 73000,
        "low": 72300,
        "volume": 11494644,
        "date": "20231117"
    },
    {
        "open": 72100,
        "close": 72700,
        "high": 73000,
        "low": 72100,
        "volume": 10610157,
        "date": "20231120"
    },
    {
        "open": 73100,
        "close": 72800,
        "high": 73400,
        "low": 72700,
        "volume": 9712881,
        "date": "20231121"
    },
    {
        "open": 72200,
        "close": 72800,
        "high": 73000,
        "low": 71900,
        "volume": 11105143,
        "date": "20231122"
    },
    {
        "open": 73000,
        "close": 72400,
        "high": 73200,
        "low": 72200,
        "volume": 6775614,
        "date": "20231123"
    },
    {
        "open": 72400,
        "close": 71700,
        "high": 72600,
        "low": 71700,
        "volume": 6676685,
        "date": "20231124"
    },
    {
        "open": 71500,
        "close": 71300,
        "high": 72100,
        "low": 71100,
        "volume": 9113857,
        "date": "20231127"
    },
    {
        "open": 71400,
        "close": 72700,
        "high": 72700,
        "low": 71300,
        "volume": 13283081,
        "date": "20231128"
    },
    {
        "open": 72400,
        "close": 72700,
        "high": 72800,
        "low": 72200,
        "volume": 9283933,
        "date": "20231129"
    },
    {
        "open": 72700,
        "close": 72800,
        "high": 72800,
        "low": 72200,
        "volume": 15783714,
        "date": "20231130"
    },
    {
        "open": 72400,
        "close": 72000,
        "high": 72500,
        "low": 71700,
        "volume": 9871284,
        "date": "20231201"
    },
    {
        "open": 72800,
        "close": 72600,
        "high": 72900,
        "low": 72400,
        "volume": 10229267,
        "date": "20231204"
    },
    {
        "open": 72300,
        "close": 71200,
        "high": 72400,
        "low": 71200,
        "volume": 12129682,
        "date": "20231205"
    },
    {
        "open": 71800,
        "close": 71700,
        "high": 72100,
        "low": 71600,
        "volume": 8123087,
        "date": "20231206"
    },
    {
        "open": 71800,
        "close": 71500,
        "high": 71900,
        "low": 71100,
        "volume": 8862017,
        "date": "20231207"
    },
    {
        "open": 72100,
        "close": 72600,
        "high": 72800,
        "low": 71900,
        "volume": 10859463,
        "date": "20231208"
    },
    {
        "open": 72800,
        "close": 73000,
        "high": 73000,
        "low": 72200,
        "volume": 9861960,
        "date": "20231211"
    },
    {
        "open": 73300,
        "close": 73500,
        "high": 73500,
        "low": 73100,
        "volume": 13758646,
        "date": "20231212"
    },
    {
        "open": 73300,
        "close": 72800,
        "high": 73500,
        "low": 72800,
        "volume": 13116766,
        "date": "20231213"
    },
    {
        "open": 74100,
        "close": 73100,
        "high": 74300,
        "low": 72500,
        "volume": 27567592,
        "date": "20231214"
    },
    {
        "open": 73800,
        "close": 73300,
        "high": 74000,
        "low": 73200,
        "volume": 15419815,
        "date": "20231215"
    },
    {
        "open": 73300,
        "close": 72900,
        "high": 73400,
        "low": 72800,
        "volume": 9690551,
        "date": "20231218"
    },
    {
        "open": 73000,
        "close": 73400,
        "high": 73400,
        "low": 72800,
        "volume": 8907632,
        "date": "20231219"
    },
    {
        "open": 74200,
        "close": 74800,
        "high": 74900,
        "low": 73800,
        "volume": 16870156,
        "date": "20231220"
    },
    {
        "open": 74600,
        "close": 75000,
        "high": 75000,
        "low": 74300,
        "volume": 13478766,
        "date": "20231221"
    },
    {
        "open": 75800,
        "close": 75900,
        "high": 76300,
        "low": 75400,
        "volume": 14515608,
        "date": "20231222"
    },
    {
        "open": 76100,
        "close": 76600,
        "high": 76700,
        "low": 75700,
        "volume": 13164909,
        "date": "20231226"
    },
    {
        "open": 76700,
        "close": 78000,
        "high": 78000,
        "low": 76500,
        "volume": 20651042,
        "date": "20231227"
    },
    {
        "open": 77700,
        "close": 78500,
        "high": 78500,
        "low": 77500,
        "volume": 17797536,
        "date": "20231228"
    },
    {
        "open": 78200,
        "close": 79600,
        "high": 79800,
        "low": 78200,
        "volume": 17142848,
        "date": "20240102"
    },
    {
        "open": 78500,
        "close": 77000,
        "high": 78800,
        "low": 77000,
        "volume": 21753644,
        "date": "20240103"
    },
    {
        "open": 76100,
        "close": 76600,
        "high": 77300,
        "low": 76100,
        "volume": 15324439,
        "date": "20240104"
    },
    {
        "open": 76700,
        "close": 76600,
        "high": 77100,
        "low": 76400,
        "volume": 11304316,
        "date": "20240105"
    },
    {
        "open": 77000,
        "close": 76500,
        "high": 77500,
        "low": 76400,
        "volume": 11088724,
        "date": "20240108"
    },
    {
        "open": 77400,
        "close": 74700,
        "high": 77700,
        "low": 74300,
        "volume": 26019248,
        "date": "20240109"
    },
    {
        "open": 75000,
        "close": 73600,
        "high": 75200,
        "low": 73200,
        "volume": 20259528,
        "date": "20240110"
    },
    {
        "open": 72900,
        "close": 73200,
        "high": 73600,
        "low": 72700,
        "volume": 57691264,
        "date": "20240111"
    },
    {
        "open": 73000,
        "close": 73100,
        "high": 74100,
        "low": 72800,
        "volume": 13038939,
        "date": "20240112"
    },
    {
        "open": 73200,
        "close": 73900,
        "high": 74000,
        "low": 73200,
        "volume": 13212339,
        "date": "20240115"
    },
    {
        "open": 73500,
        "close": 72600,
        "high": 73700,
        "low": 72500,
        "volume": 14760415,
        "date": "20240116"
    },
    {
        "open": 73100,
        "close": 71000,
        "high": 73300,
        "low": 71000,
        "volume": 22683660,
        "date": "20240117"
    },
    {
        "open": 71600,
        "close": 71700,
        "high": 72000,
        "low": 70700,
        "volume": 17853396,
        "date": "20240118"
    },
    {
        "open": 73500,
        "close": 74700,
        "high": 74700,
        "low": 73000,
        "volume": 23363428,
        "date": "20240119"
    },
    {
        "open": 75900,
        "close": 75100,
        "high": 76000,
        "low": 75000,
        "volume": 19673376,
        "date": "20240122"
    },
    {
        "open": 75700,
        "close": 75200,
        "high": 75800,
        "low": 74300,
        "volume": 14786224,
        "date": "20240123"
    },
    {
        "open": 75200,
        "close": 74000,
        "high": 75200,
        "low": 73500,
        "volume": 12860661,
        "date": "20240124"
    },
    {
        "open": 74200,
        "close": 74100,
        "high": 74800,
        "low": 73700,
        "volume": 11737747,
        "date": "20240125"
    },
    {
        "open": 73700,
        "close": 73400,
        "high": 74500,
        "low": 73300,
        "volume": 11160062,
        "date": "20240126"
    },
    {
        "open": 73800,
        "close": 74400,
        "high": 75200,
        "low": 73500,
        "volume": 13976521,
        "date": "20240129"
    },
    {
        "open": 75000,
        "close": 74300,
        "high": 75300,
        "low": 73700,
        "volume": 12244418,
        "date": "20240130"
    },
    {
        "open": 73400,
        "close": 72700,
        "high": 74000,
        "low": 72500,
        "volume": 15703560,
        "date": "20240131"
    },
    {
        "open": 73000,
        "close": 73600,
        "high": 74200,
        "low": 72900,
        "volume": 19881032,
        "date": "20240201"
    },
    {
        "open": 74000,
        "close": 75200,
        "high": 75200,
        "low": 73700,
        "volume": 14955881,
        "date": "20240202"
    },
    {
        "open": 74200,
        "close": 74300,
        "high": 74800,
        "low": 73500,
        "volume": 19026020,
        "date": "20240205"
    },
    {
        "open": 74300,
        "close": 74400,
        "high": 74700,
        "low": 73300,
        "volume": 14559254,
        "date": "20240206"
    },
    {
        "open": 74600,
        "close": 75000,
        "high": 75500,
        "low": 74300,
        "volume": 16566445,
        "date": "20240207"
    },
    {
        "open": 75000,
        "close": 74100,
        "high": 75200,
        "low": 73600,
        "volume": 20810708,
        "date": "20240208"
    },
    {
        "open": 74800,
        "close": 75200,
        "high": 75200,
        "low": 74400,
        "volume": 21966744,
        "date": "20240213"
    },
    {
        "open": 73700,
        "close": 74000,
        "high": 74300,
        "low": 73700,
        "volume": 12434945,
        "date": "20240214"
    },
    {
        "open": 74200,
        "close": 73000,
        "high": 74400,
        "low": 73000,
        "volume": 14120600,
        "date": "20240215"
    },
    {
        "open": 73300,
        "close": 72800,
        "high": 73400,
        "low": 72500,
        "volume": 13444781,
        "date": "20240216"
    },
    {
        "open": 72800,
        "close": 73800,
        "high": 73900,
        "low": 72800,
        "volume": 12726404,
        "date": "20240219"
    },
    {
        "open": 73700,
        "close": 73300,
        "high": 73700,
        "low": 72800,
        "volume": 14681477,
        "date": "20240220"
    },
    {
        "open": 73400,
        "close": 73000,
        "high": 73700,
        "low": 72900,
        "volume": 11503495,
        "date": "20240221"
    },
    {
        "open": 73800,
        "close": 73100,
        "high": 73900,
        "low": 72700,
        "volume": 15208934,
        "date": "20240222"
    },
    {
        "open": 73600,
        "close": 72900,
        "high": 74200,
        "low": 72900,
        "volume": 16225166,
        "date": "20240223"
    },
    {
        "open": 72300,
        "close": 72800,
        "high": 73200,
        "low": 72200,
        "volume": 14669352,
        "date": "20240226"
    },
    {
        "open": 73100,
        "close": 72900,
        "high": 73400,
        "low": 72700,
        "volume": 13201981,
        "date": "20240227"
    },
    {
        "open": 72900,
        "close": 73200,
        "high": 73900,
        "low": 72800,
        "volume": 11795859,
        "date": "20240228"
    },
    {
        "open": 72600,
        "close": 73400,
        "high": 73400,
        "low": 72000,
        "volume": 21176404,
        "date": "20240229"
    },
    {
        "open": 74300,
        "close": 74900,
        "high": 75000,
        "low": 74000,
        "volume": 23210474,
        "date": "20240304"
    },
    {
        "open": 74600,
        "close": 73700,
        "high": 74800,
        "low": 73700,
        "volume": 19505124,
        "date": "20240305"
    },
    {
        "open": 73200,
        "close": 72900,
        "high": 73500,
        "low": 72700,
        "volume": 21547904,
        "date": "20240306"
    },
    {
        "open": 73100,
        "close": 72200,
        "high": 73300,
        "low": 72200,
        "volume": 14516963,
        "date": "20240307"
    },
    {
        "open": 72800,
        "close": 73300,
        "high": 73400,
        "low": 72600,
        "volume": 19271348,
        "date": "20240308"
    },
    {
        "open": 72900,
        "close": 72400,
        "high": 73100,
        "low": 72300,
        "volume": 9740504,
        "date": "20240311"
    },
    {
        "open": 72600,
        "close": 73300,
        "high": 73500,
        "low": 72100,
        "volume": 13011654,
        "date": "20240312"
    },
    {
        "open": 73700,
        "close": 74100,
        "high": 74100,
        "low": 73500,
        "volume": 15243134,
        "date": "20240313"
    },
    {
        "open": 74400,
        "close": 74300,
        "high": 74500,
        "low": 73600,
        "volume": 22545540,
        "date": "20240314"
    },
    {
        "open": 73400,
        "close": 72300,
        "high": 73700,
        "low": 72300,
        "volume": 22580556,
        "date": "20240315"
    },
    {
        "open": 72600,
        "close": 72800,
        "high": 73000,
        "low": 72500,
        "volume": 11520348,
        "date": "20240318"
    },
    {
        "open": 72300,
        "close": 72800,
        "high": 73000,
        "low": 71700,
        "volume": 15376066,
        "date": "20240319"
    },
    {
        "open": 73700,
        "close": 76900,
        "high": 77200,
        "low": 73400,
        "volume": 50106296,
        "date": "20240320"
    },
    {
        "open": 79200,
        "close": 79100,
        "high": 79200,
        "low": 77700,
        "volume": 36822460,
        "date": "20240321"
    }
  ],
  date: "D",
};

export const getChartDatas = createAsyncThunk(
  "chart/getData",
  async (data, tunkAPI) => {
    const response = await getChartData(data);
    return response.data;
  }
)

export const getMinuteDatas = createAsyncThunk(
  "chart/getMinuteData",
  async (data, tunkAPI) => {
    const response = await getMinuteData(data);
    return response.data;
  }
)

const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {
    setChartDatas(state, action) {
      const f_idx = action.payload.data.begIndex;
      const l_idx = action.payload.data.nbElement;
      const getIndi = action.payload.data.result;
      if (action.payload.name === 'MACD') {
        state.datas.map(item => {
          delete item.macd;
          delete item.macdSignal;
          delete item.macdHist;
        });

        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["macd"] = getIndi.outMACD[i]
          state.datas[f_idx + i]["macdSignal"] = getIndi.outMACDSignal[i] // 새로운 속성 추가
          state.datas[f_idx + i]["macdHist"] = getIndi.outMACDHist[i] // 새로운 속성 추가
        }
      } else if (action.payload.name === 'STOCHF') {
        state.datas.map(item => {
          delete item.outFastK;
          delete item.outFastD;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["outFastK"] = getIndi.outFastK[i]
          state.datas[f_idx + i]["outFastD"] = getIndi.outFastD[i] // 새로운 속성 추가
        }
      } else if (action.payload.name === 'STOCH') {
        state.datas.map(item => {
          delete item.outSlowK;
          delete item.outSlowD;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["outSlowK"] = getIndi.outSlowK[i]
          state.datas[f_idx + i]["outSlowD"] = getIndi.outSlowD[i] // 새로운 속성 추가
        }
      } else if (action.payload.name === 'RSI') {
        state.datas.map(item => {
          delete item.rsi;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["rsi"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'CCI') {
        state.datas.map(item => {
          delete item.cci;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["cci"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'MOM') {
        state.datas.map(item => {
          delete item.mom;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["mom"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'ROC') {
        state.datas.map(item => {
          delete item.roc;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["roc"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'AD') {
        state.datas.map(item => {
          delete item.ad;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["ad"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'ATR') {
        state.datas.map(item => {
          delete item.atr;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["atr"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'MFI') {
        state.datas.map(item => {
          delete item.mfi;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["mfi"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'OBV') {
        state.datas.map(item => {
          delete item.obv;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["obv"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'ADOSC') {
        state.datas.map(item => {
          delete item.adosc;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["adosc"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'TRIX') {
        state.datas.map(item => {
          delete item.trix;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["trix"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'WILLR') {
        state.datas.map(item => {
          delete item.willr;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["willr"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'DMI') {
        state.datas.map(item => {
          delete item.dx;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["dx"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'ADX') {
        state.datas.map(item => {
          delete item.adx;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["adx"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'ADXR') {
        state.datas.map(item => {
          delete item.adxr;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["adxr"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'AROON') {
        state.datas.map(item => {
          delete item.aroonDown;
          delete item.aroonUp;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["aroonDown"] = getIndi.outAroonDown[i]
          state.datas[f_idx + i]["aroonUp"] = getIndi.outAroonUp[i]
        }
      } else if (action.payload.name === 'AROONOSC') {
        state.datas.map(item => {
          delete item.aroonosc;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["aroonosc"] = getIndi.outReal[i]
        }
      } else if (action.payload.name === 'STOCHRSI') {
        state.datas.map(item => {
          delete item.stochRsiK;
          delete item.stochRsiD;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["stochRsiK"] = getIndi.outFastK[i];
          state.datas[f_idx + i]["stochRsiD"] = getIndi.outFastD[i];
        }
      } else if (action.payload.name === 'ULTOSC') {
        state.datas.map(item => {
          delete item.ultosc;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["ultosc"] = getIndi.outReal[i];
        }
      } else if (action.payload.name === 'PPO') {
        state.datas.map(item => {
          delete item.ppo;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["ppo"] = getIndi.outReal[i];
        }
      } else if (action.payload.name === 'BBANDS') {
        state.datas.map(item => {
          delete item.upper;
          delete item.middle;
          delete item.lower;
        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["upper"] = getIndi.outRealUpperBand[i];
          state.datas[f_idx + i]["middle"] = getIndi.outRealMiddleBand[i];
          state.datas[f_idx + i]["lower"] = getIndi.outRealLowerBand[i];
        }
      } else if (action.payload.name === 'SAR') {
        state.datas.map(item => {
          delete item.sar;

        });
        for (let i = 0; i < l_idx; i++) {
          state.datas[f_idx + i]["sar"] = getIndi.outReal[i];
        }
      } else if (action.payload.name === 'EMA') {
        state.datas.map(item => {
          Object.keys(item).forEach(key => {
            if (key.includes('ema')) {
              delete item[key];
            }
          });
        });

        const responses = [action.payload.data.response1, action.payload.data.response2, action.payload.data.response3, action.payload.data.response4, action.payload.data.response5];
        const EMAValue = action.payload.value;
        responses.forEach((response, index) => {
          const f_idx = response.begIndex;
          const l_idx = response.nbElement;
          const subData = response.result.outReal;
          for (let i = 0; i < l_idx; i++) {
            const emaKey = `ema${[EMAValue[0], EMAValue[1], EMAValue[2], EMAValue[3], EMAValue[4]][index]}`;
            state.datas[f_idx + i][emaKey] = subData[i];
          }
        });
      } else if (action.payload.name === 'SMA') {
        state.datas.map(item => {
          Object.keys(item).forEach(key => {
            if (key.includes('sma')) {
              delete item[key];
            }
          });
        });

        const responses = [action.payload.data.response1, action.payload.data.response2, action.payload.data.response3, action.payload.data.response4, action.payload.data.response5];
        const SMAValue = action.payload.value;
        responses.forEach((response, index) => {
          const f_idx = response.begIndex;
          const l_idx = response.nbElement;
          const subData = response.result.outReal;
          for (let i = 0; i < l_idx; i++) {
            const smaKey = `sma${[SMAValue[0], SMAValue[1], SMAValue[2], SMAValue[3], SMAValue[4]][index]}`;
            state.datas[f_idx + i][smaKey] = subData[i];
          }
        });
      } else if (action.payload.name === 'WMA') {
        state.datas.map(item => {
          Object.keys(item).forEach(key => {
            if (key.includes('wma')) {
              delete item[key];
            }
          });
        });

        const responses = [action.payload.data.response1, action.payload.data.response2, action.payload.data.response3, action.payload.data.response4, action.payload.data.response5];
        const WMAValue = action.payload.value;
        responses.forEach((response, index) => {
          const f_idx = response.begIndex;
          const l_idx = response.nbElement;
          const subData = response.result.outReal;
          for (let i = 0; i < l_idx; i++) {
            const wmaKey = `wma${[WMAValue[0], WMAValue[1], WMAValue[2], WMAValue[3], WMAValue[4]][index]}`;
            state.datas[f_idx + i][wmaKey] = subData[i];
          }
        });
      }
    },
    setClickDate(state, action) {
      state.date = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.datas = action.payload.reverse();
    }),
    builder.addCase(getMinuteDatas.fulfilled, (state, action) => {
      state.datas = action.payload.reverse();
    })
  },
});

const { setChartDatas, setClickDate } = chartSlice.actions;
export { setChartDatas, setClickDate };

export default chartSlice.reducer;
