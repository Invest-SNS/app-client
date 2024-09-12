import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChartData, getMinuteData } from '../../../lib/apis/chart'

const initialState = {
  // default : 삼성전자
  datas: [],
  date: "D",
  loading: false,
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
    setLiveData(state, action) {
      state.datas.pop();
      state.datas.push(action.payload)
    },
    setClickDate(state, action) {
      state.date = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.datas = action.payload.reverse();
      state.loading = false;
    }),
    builder.addCase(getChartDatas.pending, (state, action) => {
      state.loading = true;
    })
  },
});

const { setChartDatas, setClickDate, setLiveData } = chartSlice.actions;
export { setChartDatas, setClickDate, setLiveData };

export default chartSlice.reducer;
