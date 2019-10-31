import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Animated,
  Dimensions,
  ViewStyle
} from 'react-native';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

type Props = {
  /**
   * Container style
   */
  style: ViewStyle;

  /**
   * Component's width
   */
  width: number;

  /**
   * Component's height
   */
  height: number;

  /**
   * Vertical mode
   */
  vertical: boolean;

  /**
   * Minimum value of the ruler
   */
  minimum: number;

  /**
   * Maximum value of the ruler
   */
  maximum: number;

  /**
   * Each segment's width
   */
  segmentWidth: number;

  /**
   * Each segment's space
   */
  segmentSpacing: number;

  /**
   * Color of indicator
   */
  indicatorColor: string;

  /**
   * Indicator's width
   */
  indicatorWidth: number;

  /**
   * Indicator's height
   */
  indicatorHeight: number;

  /**
   * Indicator's space from bottom
   */
  indicatorBottom: number;

  /**
   * Step
   */
  step: number;

  /**
   * Steps color
   */
  stepColor: string;

  /**
   * Steps height
   */
  stepHeight: number;

  /**
   * Normal lines color
   */
  normalColor: string;

  /**
   * Normal lines height
   */
  normalHeight: number;

  /**
   * Background color
   */
  backgroundColor: string;

  /**
   * Number's font family
   */
  numberFontFamily: string;

  /**
   * Number's size
   */
  numberSize: number;

  /**
   * Number's color
   */
  numberColor: string;

  /**
   * Unit
   */
  unit: string;

  /**
   * Unit's space from bottom
   */
  unitBottom: number;

  /**
   * Unit's font family
   */
  unitFontFamily: string;

  /**
   * Unit's color
   */
  unitColor: string;

  /**
   * Unit's size
   */
  unitSize: number;

  /**
   * On value change
   */
  onChangeValue: Function;
};

class Ruler extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0),
      value: 0
    };

    // References
    this.scrollViewRef = React.createRef();
    this.textInputRef = React.createRef();

    // Calculations
    this.snapSegment = props.segmentWidth + props.segmentSpacing;
    this.spacerWidth = (props.width - props.segmentWidth) / 2;
    this.rulerWidth =
      props.width -
      props.segmentWidth +
      (props.maximum - props.minimum) * this.snapSegment;
  }

  componentDidMount() {
    const { minimum } = this.props;

    // Create a listener
    this.scrollListener = this.state.scrollX.addListener(({ value }) => {
      if (this.textInputRef && this.textInputRef.current) {
        this.textInputRef.current.setNativeProps({
          text: `${Math.round(value / this.snapSegment) + minimum}`
        });

        this.setState({
          value: Math.round(value / this.snapSegment) + minimum
        });
      }
    });
  }

  componentWillUnmount() {
    // Remove the above listener
    this.state.scrollX.removeListener(this.scrollListener);
  }

  renderRuler() {
    const {
      minimum,
      maximum,
      segmentWidth,
      segmentSpacing,
      step,
      stepColor,
      stepHeight,
      normalColor,
      normalHeight
    } = this.props;

    // Create an array to make a ruler
    const data = [...Array(maximum - minimum + 1).keys()].map(i => i + minimum);

    return (
      <View
        style={{
          width: this.rulerWidth,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end'
        }}
      >
        {/* Spacer */}
        <View
          style={{
            width: this.spacerWidth
          }}
        />

        {/* Ruler */}
        {data.map(i => {
          return (
            <View
              key={i}
              style={{
                backgroundColor: i % step === 0 ? stepColor : normalColor,
                height: i % step === 0 ? stepHeight : normalHeight,
                width: segmentWidth,
                marginRight: segmentSpacing
              }}
            />
          );
        })}

        {/* Spacer */}
        <View
          style={{
            width: this.spacerWidth
          }}
        />
      </View>
    );
  }

  render() {
    const {
      style,
      minimum,
      segmentWidth,
      indicatorWidth,
      indicatorHeight,
      indicatorColor,
      indicatorBottom,
      backgroundColor,
      numberFontFamily,
      numberSize,
      numberColor,
      unit,
      unitBottom,
      unitFontFamily,
      unitColor,
      unitSize,
      width,
      height,
      vertical,
      onChangeValue
    } = this.props;

    return (
      <SafeAreaView
        style={[
          style,
          {
            width,
            height,
            backgroundColor,
            position: 'relative',
            transform: vertical ? [{ rotate: '90deg' }] : undefined
          }
        ]}
      >
        <Animated.ScrollView
          ref={this.scrollViewRef}
          horizontal
          contentContainerStyle={{
            justifyContent: 'flex-end'
          }}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={this.snapSegment}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: this.state.scrollX }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={() => onChangeValue(this.state.value)}
        >
          {this.renderRuler()}
        </Animated.ScrollView>

        {/* Number && Unit */}
        <View
          style={{
            width: indicatorWidth,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: indicatorBottom,
            left: (width - indicatorWidth) / 2
          }}
          pointerEvents='none'
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              transform: vertical ? [{ rotate: '-90deg' }] : undefined
            }}
          >
            {/* Number */}
            <TextInput
              ref={this.textInputRef}
              style={{
                fontSize: numberSize,
                fontFamily: numberFontFamily,
                color: numberColor
              }}
              defaultValue={minimum.toString()}
            />

            {/* Unit */}
            <Text
              style={{
                marginBottom: unitBottom,
                fontSize: unitSize,
                fontFamily: unitFontFamily,
                color: unitColor
              }}
            >
              {unit}
            </Text>
          </View>

          {/* Indicator */}
          <View
            style={{
              height: indicatorHeight,
              backgroundColor: indicatorColor,
              width: segmentWidth
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

Ruler.defaultProps = {
  style: {},
  vertical: false,
  width,
  height: height * 0.23,
  onChangeValue: () => {},
  minimum: 0,
  maximum: 100,
  segmentWidth: 2,
  segmentSpacing: 20,
  indicatorColor: '#FF0000',
  indicatorWidth: 100,
  indicatorHeight: 80,
  indicatorBottom: 20,
  step: 10,
  stepColor: '#333333',
  stepHeight: 40,
  normalColor: '#999999',
  normalHeight: 20,
  backgroundColor: '#FFFFFF',
  numberFontFamily: 'System',
  numberSize: 40,
  numberColor: '#000000',
  unit: 'cm',
  unitBottom: height * 0.027,
  unitFontFamily: 'System',
  unitColor: '#888888',
  unitSize: 16
};

export default Ruler;
