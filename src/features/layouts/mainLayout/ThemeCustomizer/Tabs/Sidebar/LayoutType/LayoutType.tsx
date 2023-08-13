import React, { Fragment, useState, useEffect } from 'react'
import { useAppDispatch } from '../../../../../../../app/hooks'
import { ThemeConfigurations } from '../../../../../../config/ThemeConfig'
import { H6, UL, LI } from '../../../../../../utils/ReusableElements'
import { setLayout } from '../../../ThemeCustomizerSlice'
import CommenUL from '../CommenUL'

const LayoutType = () => {
  const dispatch = useAppDispatch()
  const localStorageLayout = localStorage.getItem('layout_type') || ThemeConfigurations.data.settings.layout_type
  const [layout_type, setLayout_type] = useState(localStorageLayout)

  useEffect(() => {
    localStorageLayout && document.body.classList.add(localStorageLayout)
    ThemeConfigurations.data.settings.layout_type = localStorageLayout

    if (localStorageLayout === 'ltr') {
      document.documentElement.dir = 'ltr'
    } else {
      document.documentElement.dir = localStorageLayout
    }
  }, [localStorageLayout])

  const handleLayout = (layout: string) => {
    dispatch(setLayout(layout))
    setLayout_type(layout)
    if (layout === 'rtl') {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
      document.body.classList.remove('box-layout')
      document.documentElement.dir = 'rtl'
    } else if (layout === 'ltr') {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
      document.body.classList.remove('box-layout')
      document.documentElement.dir = 'ltr'
    } else if (layout === 'box-layout') {
      document.body.classList.remove('ltr')
      document.body.classList.remove('rtl')
      document.body.classList.add('box-layout')
      document.documentElement.dir = 'ltr'
    }
  }

  return (
    <Fragment>
      <H6>Layout Type</H6>
      <UL attrUL={{ className: 'simple-list main-layout layout-grid flex-row' }}>
        <LI
          attrLI={{
            className: `${layout_type === 'ltr' ? 'active' : ''}`,
            onClick: () => handleLayout('ltr'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL>
              <LI attrLI={{ className: 'bg-light sidebar' }}></LI>
              <LI attrLI={{ className: 'bg-light body' }}>
                <span className="badge badge-primary">LTR</span>
              </LI>
            </UL>
          </div>
        </LI>
        <LI
          attrLI={{
            className: `${layout_type === 'rtl' ? 'active' : ''}`,
            onClick: () => handleLayout('rtl'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL>
              <LI attrLI={{ className: 'bg-light body' }}>
                <span className="badge badge-primary">RTL</span>
              </LI>
              <LI attrLI={{ className: 'bg-light sidebar' }}></LI>
            </UL>
          </div>
        </LI>
        <LI
          attrLI={{
            className: `${layout_type === 'box-layout' ? 'active' : ''}`,
            onClick: () => handleLayout('box-layout'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL>
              <LI attrLI={{ className: 'bg-light sidebar' }}></LI>
              <LI attrLI={{ className: 'bg-light body' }}>
                <span className="badge badge-primary">Box</span>
              </LI>
            </UL>
          </div>
        </LI>
      </UL>
    </Fragment>
  )
}

export default LayoutType