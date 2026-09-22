import { Stack } from 'expo-router';

export default function InspectorLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tasks/index" />
    </Stack>
  );
}
