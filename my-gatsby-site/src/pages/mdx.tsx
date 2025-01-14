import {Field, PageConfig, PageProps} from 'jaen'
import {Box} from '@chakra-ui/react'
import {MdxField, UncontrolledMdxField} from 'jaen-fields-mdx'
import {Link} from 'gatsby-plugin-jaen'
import {usePage} from 'jaen'
import {useEffect, useState} from 'react'

const QASMPlayground: React.FC<{
  playground?: boolean
  children: string
}> = ({children, playground = false, ...props}) => {
  console.log('QASMPlayground:', playground, props)

  return <Box bg={playground ? 'red.600' : 'blue.200'}>{children}</Box>
}

QASMPlayground.displayName = 'QASMPlayground'
QASMPlayground.defaultProps = {
  children: `defaultQASMCode`
}

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  // everything after /user/ is the handle
  // const handle = location.pathname.split('/user/')[1];

  const page = usePage()

  const [value, setValue] = useState<any>()

  useEffect(() => {
    const storedValue = localStorage.getItem('mdxValue')
    if (storedValue) {
      setValue(storedValue)
    }
  }, [])

  const save = () => {
    localStorage.setItem('mdxValue', value)
  }

  const needsSaving = value !== localStorage.getItem('mdxValue')

  // return (
  //   <>
  //     <UncontrolledMdxField
  //       components={{QASMPlayground}}
  //       value={value}
  //       onUpdateValue={(mdast: any, value: string) => {
  //         setValue(value)
  //       }}
  //       isEditing={true}
  //     />

  //     <button onClick={save} disabled={!needsSaving}>
  //       Save
  //     </button>
  //   </>
  // )

  return (
    <>
      <Link
        to="/"
        position="relative"
        display="inline-block"
        color="brand.600"
        textDecoration="none"
        _hover={{
          color: 'brand.600',
          _before: {
            transform: 'scaleX(1)'
          }
        }}
        _before={{
          content: '""',
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '2px',
          bottom: -0.5,
          left: 0,
          backgroundColor: 'brand.600',
          transform: 'scaleX(0)',
          transformOrigin: 'top left',
          transition: 'transform 0.3s ease'
        }}

        // next next children to inline-block
      >
        <p>test</p>
      </Link>
      <MdxField
        name="my-mdx-field"
        components={{
          QASMPlayground,
          code: ({children, ...props}: any) => {
            console.log('code:', props)
            return <Box bg="red.600">{children}</Box>
          },
          Text: () => {
            return <Field.Text name="text" defaultValue="default text" />
          }
        }}
      />
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'MDX',
  icon: 'FaUser'
}
