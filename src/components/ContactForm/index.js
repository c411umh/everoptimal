import React from 'react'
import { Row, Col } from 'antd'
import Zoom from 'react-reveal/Zoom'
import loadable from '@loadable/component'
import { withTranslation } from 'react-i18next'

import useForm from './useForm'
import validate from './validationRules'
import * as S from './styles'

const Block = loadable(() => import('../Block'))
const Input = loadable(() => import('../../common/Input'))
const Button = loadable(() => import('../../common/Button'))
const TextArea = loadable(() => import('../../common/TextArea'))

const Contact = ({ title, content, id, t }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate)

  const ValidationType = ({ type }) => {
    const ErrorMessage = errors[type]
    return errors[type] ? (
      <Zoom cascade>
        <S.Span>{ErrorMessage}</S.Span>
      </Zoom>
    ) : (
      <S.Span />
    )
  }

  return (
    <S.ContactContainer id={id}>
      <S.Contact>
        <Row type='flex' justify='space-between' align='middle'>
          <Col lg={12} md={11} sm={24}>
            <Block padding={true} title={title} content={content} />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <S.FormGroup autoComplete='off' onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type='text'
                  name='name'
                  id='Name'
                  placeholder='Your name'
                  value={values.name || ''}
                  onChange={handleChange}
                />
                <ValidationType type='name' />
              </Col>
              <Col span={24}>
                <Input
                  type='text'
                  name='email'
                  id='Email'
                  placeholder='Your email address'
                  value={values.email || ''}
                  onChange={handleChange}
                />
                <ValidationType type='email' />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder='Your message'
                  value={values.message || ''}
                  name='message'
                  id='Message'
                  onChange={handleChange}
                />
                <ValidationType type='message' />
              </Col>
              <S.ButtonContainer>
                <a
                  href={`mailto:finance@everoptimal.com?subject=${encodeURIComponent(
                    `I'd like to discuss my project`
                  )}&body=${encodeURIComponent(`${values.message}\n\nKind regards,\n${values.name}`)}`}
                >
                  <Button name='submit' type='button'>
                    {t('Submit')}
                  </Button>
                </a>
              </S.ButtonContainer>
            </S.FormGroup>
          </Col>
        </Row>
      </S.Contact>
    </S.ContactContainer>
  )
}

export default withTranslation()(Contact)
