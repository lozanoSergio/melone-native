import React from 'react';
import {Image, StyleSheet} from 'react-native';

export const ImageIcon = (source, style) => {
  StyleSheet.flatten(style);
  return <Image style={style} source={source.imageSource} />;
};
