import { StyleSheet, Text, TextProps } from 'react-native';

export const ErrorText = ({ children, style, ...props }: TextProps) => (
  <Text {...props} style={[errorText, style]}>
    {children}
  </Text>
);

const { errorText } = StyleSheet.create({
  errorText: {
    fontWeight: 'bold',
    color: 'red',
  },
});
