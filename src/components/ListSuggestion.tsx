import { ScrollView, View } from "react-native"
import React from "react"
import { Badge, Divider, List } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"

type ListSuggestionProps = {
  itemName: string
  unitPrice: number
  onPress: () => void
  id?: number | string
  itemDesc?: string
}

export default function ListSuggestion({
  id,
  itemName,
  itemDesc,
  unitPrice,
  onPress,
}: ListSuggestionProps) {
  const theme = usePaperColorScheme()
  return (
    <>
      <List.Item
        title={itemName}
        description={itemDesc}
        onPress={onPress}
        left={props => <List.Icon {...props} icon="basket" />}
        right={props => (
          <Badge
            {...props}
            style={{
              backgroundColor: theme.colors.tertiaryContainer,
              color: theme.colors.onTertiaryContainer,
            }}>
            {`${unitPrice}/-`}
          </Badge>
        )}
      />
      <Divider />
    </>
  )
}
