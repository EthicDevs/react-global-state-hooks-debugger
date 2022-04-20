export function testEnvReactNative(): boolean {
  try {
    import('react-native');
    return true;
  } catch (_) {
    return false;
  }
}
