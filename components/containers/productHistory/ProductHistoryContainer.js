import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {List, withStyles} from 'react-native-ui-kitten';
import {ContainerView, Loader} from '../../common';
import {ProductHistoryListItem} from '../../productHistory/ProductHistoryListItem';

class ProductHistoryContainerComponent extends React.Component {
  onRemoveProductPress = (index, product) => {
    this.props.onRemoveProductPress(index, product);
  };

  onItemPress = info => {
    this.props.onItemPress(info);
  };

  handleLoadMore = () => {
    this.props.handleLoadMore();
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.loading) return null;
    return <Loader size={20} />;
  };

  renderProduct = info => {
    const {themedStyle} = this.props;

    return (
      <ProductHistoryListItem
        style={themedStyle.item}
        //activeOpacity={0.75}
        product={info.item}
        index={info.index}
        onItemPress={this.onItemPress}
        onRemoveProduct={this.onRemoveProductPress}
      />
    );
  };

  render() {
    const {themedStyle, products, loadMore, loading, ...restProps} = this.props;

    return (
      <ContainerView
        style={themedStyle.container}
        contentContainerStyle={themedStyle.contentContainer}>
        <View>
          <List
            data={products}
            renderItem={this.renderProduct}
            onEndReached={loadMore && !loading ? this.handleLoadMore : null}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            ListFooterComponent={this.renderFooter.bind(this)}
            viewabilityConfig={{
              minimumViewTime: 300,
              viewAreaCoveragePercentThreshold: 100,
              waitForInteraction: true,
            }}
            {...restProps}
          />
        </View>
      </ContainerView>
    );
  }
}

export const ProductHistoryContainer = withStyles(
  ProductHistoryContainerComponent,
  theme => ({
    container: {
      backgroundColor: theme['background-basic-color-2'],
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    item: {
      marginVertical: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  }),
);
