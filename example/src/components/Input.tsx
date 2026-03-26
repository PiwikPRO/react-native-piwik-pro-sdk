import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles';

interface InputProps {
  onChangeText: (text: string) => void;
  label: string;
  value: string;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
}

export function Input({
  onChangeText,
  value,
  label,
  keyboardType = 'default',
  placeholder,
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
}
