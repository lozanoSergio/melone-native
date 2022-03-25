import React from 'react';
import {withStyles, Text, List, Layout} from 'react-native-ui-kitten';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';
import {textStyle} from '../../common/style';

let deviceWidth = 0;

class NutrientsChartComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    // const values = this.props.values.filter(value => value.type !== "calories");

    // let checkPieValues = values.map((value, index) => {
    //   if (value.value > 0) {
    //     return (checkPieValues = true);
    //   } else {
    //     return (checkPieValues = false);
    //   }
    // });
    // let dataPieChart;
    // if (checkPieValues.includes(true)) {
    //   dataPieChart = values.map((value, index) => {
    //     return {
    //       key: value.type,
    //       value: value.value,
    //       svg: { fill: value.color }
    //     };
    //   });
    // } else {
    //   dataPieChart = [
    //     {
    //       key: "unfilled",
    //       value: 1,
    //       svg: { fill: "#edf0f4" }
    //     }
    //   ];
    // }

    // const dataBarChart = this.props.values.sort((a, b) =>
    //   a.value < b.value ? 1 : b.value < a.value ? -1 : 0
    // );

    deviceWidth = this.props.deviceWidth;

    // this.state = {
    //   dataPieChart,
    //   dataBarChart,
    //   selectedSlice: {
    //     label: "Melone Score",
    //     value: 18
    //   }
    // };
  }

  renderItem = info => {
    const {themedStyle} = this.props;
    const type = info.item.type;
    const value = info.item.value;

    let roundedPercent;
    let progressVal;
    let labelValue = `${Math.round(value * 100) / 100}g`;

    switch (type) {
      case 'calories':
        labelValue = `${value}cals`;
        roundedPercent = (value * 100) / 2000;
        progressVal = value / 100;
        break;

      case 'proteins':
        roundedPercent = (value * 100) / 50;
        progressVal = value / 100;
        break;

      case 'carbohydrates':
        roundedPercent = (value * 100) / 300;
        progressVal = value / 100;
        break;

      case 'fat':
        roundedPercent = (value * 100) / 66.67;
        progressVal = value / 100;
        break;

      case 'saturated_fat':
        roundedPercent = (value * 100) / 18.75;
        progressVal = value / 100;
        break;

      case 'salt':
        roundedPercent = (value * 100) / 2.43;
        progressVal = value / 100;
        break;

      case 'fiber':
        roundedPercent = (value * 100) / 25;
        progressVal = value / 100;
        break;

      case 'sugars':
        roundedPercent = (value * 100) / 100;
        progressVal = value / 100;
        break;
    }

    roundedPercent = Math.round(value);

    return (
      <Layout style={themedStyle.barchartContainer}>
        <Layout style={themedStyle.itemTextContainer}>
          <View>
            <Text category="s1" style={textStyle.caption1}>
              {info.item.label}{' '}
              <Text style={textStyle.caption2} category="s1" appearance="hint">
                {labelValue}
              </Text>
            </Text>
          </View>
          <View>
            <Text category="s1" style={textStyle.caption2}>
              {`${roundedPercent}%`}
            </Text>
          </View>
        </Layout>
        <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
          <Progress.Bar
            color={info.item.color}
            progress={progressVal}
            borderWidth={0}
            unfilledColor="#edf0f4"
            width={deviceWidth - 32}
          />
        </Layout>
      </Layout>
    );
  };

  render() {
    const {values} = this.props;

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          marginBottom: 42,
          marginTop: 8,
        }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          {/* <PieChart
            style={{ height: 250, backgroundColor: "transparent" }}
            outerRadius={"80%"}
            innerRadius={"60%"}
            data={dataPieChart}
            animate={true}
            animationDuration={500}
            padAngle={0}
          /> */}
          {/* <Text
            category="h1"
            style={{
              position: "absolute",
              left: deviceWidth / 2 - (value > 99 ? 40 : value < 10 ? 18 : 30),
              textAlign: "center",
              color: "#5AC431"
            }}
          >
            {value}
          </Text> */}
        </View>
        <List data={values} renderItem={this.renderItem} />
      </View>
    );
  }
}

export const NutrientsChart = withStyles(NutrientsChartComponent, theme => ({
  barchartContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: theme['background-basic-color-2'],
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme['background-basic-color-2'],
  },
}));
