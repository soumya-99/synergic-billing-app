import { Badge, Divider, List } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"

type ProductListSuggestionProps = {
  itemName: string
  unitPrice?: number
  onPress?: () => void
  id?: number | string
  itemDesc?: string
}

export default function ProductListSuggestion({
  id,
  itemName,
  itemDesc,
  unitPrice,
  onPress,
}: ProductListSuggestionProps) {
  const theme = usePaperColorScheme()
  return (
    <>
      <List.Item
        title={itemName}
        description={itemDesc}
        onPress={onPress}
        left={props => <List.Icon {...props} icon="basket" />}
        right={unitPrice && (props => (
          <Badge
            {...props}
            style={{
              backgroundColor: theme.colors.tertiaryContainer,
              color: theme.colors.onTertiaryContainer,
            }}>
            {`${unitPrice}/-`}
          </Badge>
        ))}
      />
      <Divider />
    </>
  )
}
