import React from 'react';
import {
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Text, Input, withStyles, Button} from 'react-native-ui-kitten';
import {ArticleActivityBar} from './ArticleActivityBar';
import {textStyle, ScrollableAvoidKeyboard, Loader} from '../common';
import {ClockIconOutline} from '../../assets/icons';
import {Icon} from '../UI/Icons';
import {CommentsList} from './comentList/CommentList';
import moment from 'moment';
import 'moment/locale/es';

const width = Dimensions.get('window').width;

const HEADER_MAX_HEIGHT = 233;
const HEADER_MIN_HEIGHT = 84;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      liked: this.props.article.liked,
      likes: this.props.article.likes,
    };
  }

  onCommentButtonPress = () => {
    this.props.onCommentPress();
  };

  onLikeButtonPress = () => {
    this.props.article.liked = this.state.liked;
    this.props.onLikePress(this.props.article);
    this.setState(prevState => ({
      liked: !prevState.liked,
      likes: prevState.liked ? prevState.likes - 1 : prevState.likes + 1,
    }));
  };

  onMorePress = comment => {
    this.props.onCommentMorePress(comment);
  };

  onReplyMorePress = index => {
    this.props.onCommentReplyMorePress(index);
  };

  onCommentTextChange = text => {
    this.props.onCommentTextChange(text);
  };

  onLikeCommentPress = comment => {
    this.props.onLikeCommentPress(comment);
  };

  handleTextSubmit = () => {
    this.props.onCommentSubmit();
  };

  handleBackAction = () => {
    this.props.handleBack();
  };

  formatContent = content => {
    content = content.replace(/\\n/g, '\n');
    content = content.replace(/\\u2022/g, '\u2022');

    return (
      <Text style={this.props.themedStyle.contentLabel} category="s1">
        {content}
      </Text>
    );
  };

  render() {
    const {
      themedStyle,
      article,
      comments,
      currentCommentText,
      user,
    } = this.props;
    const {scrollY, liked, likes} = this.state;

    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageHeaderMarginBottom = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 40 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          40 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26,
      ],
      outputRange: [1, 1, 0.5, 0],
      extrapolate: 'clamp',
    });

    const profileImageHeight = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const profileImageMarginTop = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5,
      ],
      extrapolate: 'clamp',
    });

    const headerZindex = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 233],
      outputRange: [0, 0, 999],
      extrapolate: 'clamp',
    });

    const headerTitleBottom = scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 40 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          40 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26,
      ],
      outputRange: [-20, -20, -20, 20],
      extrapolate: 'clamp',
    });

    const iconOpacity = scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 40 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          40 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26,
      ],
      outputRange: [0, 0, 0, 1],
      extrapolate: 'clamp',
    });

    let formatted = moment(article.date).fromNow();
    moment.locale('es');

    return (
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={this.handleBackAction}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 40,
              left: 16,
              zIndex: 1000,
            }}>
            <Icon name="arrowleft" type="antdesign" color="#fff" size={24} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#2AC260',
            height: headerHeight,
            zIndex: headerZindex,
            alignItems: 'center',
          }}>
          <Animated.Image
            style={{
              height: HEADER_MAX_HEIGHT,
              width: width,
              bottom: imageHeaderMarginBottom,
              zIndex: headerZindex,
              opacity: headerOpacity,
            }}
            resizeMode="cover"
            source={{uri: article.image}}
          />
          <Animated.View
            style={{
              position: 'absolute',
              bottom: headerTitleBottom,
              left: 16,
              right: 16,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: iconOpacity,
            }}>
            <View style={{width: 24, height: 24}} />
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold',
                marginHorizontal: 16,
              }}
              numberOfLines={1}>
              {article.title}
            </Text>
            <View style={{width: 24, height: 24}} />
          </Animated.View>
        </Animated.View>
        <ScrollableAvoidKeyboard
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          <Animated.View
            style={{
              height: profileImageHeight,
              width: profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginTop: profileImageMarginTop,
              marginLeft: 10,
            }}>
            <Image
              source={{uri: article.author.photoURL}}
              style={{flex: 1, width: null, height: null}}
            />
          </Animated.View>
          <Text style={themedStyle.titleLabel} category="h5">
            {article.title}
          </Text>
          {this.formatContent(article.content)}
          <ArticleActivityBar
            style={themedStyle.detailsContainer}
            comments={comments ? comments.length : 0}
            liked={liked}
            likes={likes}
            onCommentPress={this.onCommentButtonPress}
            onLikePress={this.onLikeButtonPress}>
            <View style={themedStyle.dateContainer}>
              {ClockIconOutline(themedStyle.dateIcon)}
              <Text
                style={themedStyle.dateLabel}
                appearance="hint"
                category="p2">
                {formatted}
              </Text>
            </View>
          </ArticleActivityBar>
          <View style={themedStyle.inputContainer}>
            <Text
              style={[themedStyle.inputLabel, themedStyle.inputSpace]}
              category="s1">
              Comentarios
            </Text>
          </View>

          {comments && comments.length !== 0 ? (
            <CommentsList
              data={comments}
              user={user}
              onLikePress={this.onLikeCommentPress}
              onMorePress={this.onMorePress}
              onReplyMorePress={this.onReplyMorePress}
            />
          ) : (
            <Loader size={30} />
          )}
          <View style={themedStyle.inputRow}>
            <Input
              style={themedStyle.inputSpace}
              textStyle={textStyle.paragraph}
              multiline={true}
              placeholder="Comentar..."
              value={currentCommentText}
              onChangeText={this.onCommentTextChange}
              onSubmitEditing={this.handleTextSubmit}
            />
            <Button onPress={this.handleTextSubmit} appearance="ghost">
              Publicar
            </Button>
          </View>
        </ScrollableAvoidKeyboard>
      </View>
    );
  }
}

export const Article = withStyles(ArticleComponent, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: theme['border-basic-color-2'],
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    minHeight: 233,
  },
  arrowBackIcon: {
    width: 30,
    height: 30,
    marginLeft: 16,
    backgroundColor: 'transparent',
    tintColor: theme['color-basic-100'],
  },
  authorPhoto: {
    position: 'absolute',
    left: 24,
    bottom: -32,
    margin: 0,
    borderWidth: 2,
    borderColor: theme['border-basic-color-2'],
  },
  titleLabel: {
    marginHorizontal: 24,
    marginTop: 40,
    ...textStyle.headline,
  },
  contentLabel: {
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 24,
    ...textStyle.paragraph,
  },
  dateLabel: {
    marginLeft: 8,
    ...textStyle.paragraph,
  },
  dateIcon: {
    width: 24,
    height: 24,
    tintColor: theme['text-hint-color'],
  },
  inputSpace: {
    flex: 1,
    marginLeft: 16,
  },
  inputContainer: {
    marginTop: 44,
    marginBottom: 24,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 40,
  },
  inputLabel: {
    marginBottom: 8,
    ...textStyle.subtitle,
  },
}));
