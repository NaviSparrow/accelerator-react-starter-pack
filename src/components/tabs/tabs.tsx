import React from 'react';
import {Guitar} from '../../types/guitar';
import {GuitarType} from '../../const/const';
import {useTabs} from '../../hooks/use-tabs/useTabs';

type TabsProps = {
  productInfo: Guitar;
}

export enum Tab {
  Characteristics = '#characteristics',
  Description = '#description',
}

function Tabs({productInfo}:TabsProps):JSX.Element {
  const {vendorCode, type, stringCount, description} = productInfo;
  const {activeTab, tabClickHandler} = useTabs();

  return (
    <div className="tabs">
      <a className={`button ${activeTab === Tab.Characteristics ? '' : 'button--black-border'} button--medium tabs__button`} href="#characteristics"
        onClick={(evt) => {
          evt.preventDefault();
          tabClickHandler(evt.currentTarget.hash);
        }}
      >Характеристики
      </a>
      <a className={`button ${activeTab === Tab.Description ? '' : 'button--black-border'} button--medium tabs__button`} href="#description"
        onClick={(evt) => {
          evt.preventDefault();
          tabClickHandler(evt.currentTarget.hash);
        }}
      >Описание
      </a>
      <div className="tabs__content" id="characteristics">
        <table className={`tabs__table ${activeTab !== Tab.Characteristics ? 'hidden' : ''}`}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{GuitarType.get(type)}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
        <p className={`tabs__product-description ${activeTab !== Tab.Description ? 'visually-hidden' : ''}`}>{description}</p>
      </div>
    </div>
  );
}

export default React.memo(Tabs, (prevProps, nextProps) => prevProps.productInfo === nextProps.productInfo);
