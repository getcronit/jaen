import {
  Button,
  ButtonGroup,
  Circle,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import {useAppDispatch, useAppSelector, withRedux} from '@internal/redux'
import {internalActions} from '@internal/redux/slices'
import {FiTrash} from '@react-icons/all-files/fi/FiTrash'
import DiscardAlert from '../components/DiscardAlert'

export const EditButtonGroup = withRedux(() => {
  const {onOpen, onClose, isOpen} = useDisclosure()

  const dispatch = useAppDispatch()

  const isEdting = useAppSelector(state => state.internal.status.isEditing)

  const toggleEditing = () => {
    dispatch(internalActions.setIsEditing(!isEdting))
  }

  const handleDiscard = async () => {
    dispatch(internalActions.discardAllChanges())

    return Promise.resolve(true)
  }

  return (
    <>
      <DiscardAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDiscard}
      />
      <ButtonGroup isAttached variant="outline" size="xs">
        <Button
          mr="-px"
          variant={'darkghost'}
          leftIcon={
            <Circle
              size="4"
              bg={isEdting ? 'orange' : 'gray.300'}
              color="white"
            />
          }
          onClick={toggleEditing}>
          Edit
        </Button>
        <IconButton
          variant={'darkghost'}
          aria-label="Add to friends"
          icon={<FiTrash color="orange" />}
          onClick={onOpen}
        />
      </ButtonGroup>
    </>
  )
})