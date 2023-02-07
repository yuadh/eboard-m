/**
  ******************************************************************************
  * @file    edp1in54.h
  * @author  Waveshare Team
  * @version V1.0.0
  * @date    23-January-2018
  * @brief   This file describes initialisation of 1.54 and 1.54b e-Papers
  *
  ******************************************************************************
  */

int EPD_Init_1in54()
{
    int EPD1in54 = 2;
    if(EPD1in54 == 1) {
        Serial.print("\r\nEPD1in54 V1");
        EPD_Reset();
        EPD_Send_3(0x01, 199, 0, 00);//DRIVER_OUTPUT_CONTROL: LO(EPD_HEIGHT-1), HI(EPD_HEIGHT-1). GD = 0; SM = 0; TB = 0;
        EPD_Send_3(0x0C, 0xD7, 0xD6, 0x9D);//BOOSTER_SOFT_START_CONTROL
        EPD_Send_1(0x2C, 0xA8);//WRITE_VCOM_REGISTER: VCOM 7C
        EPD_Send_1(0x3A, 0x1A);//SET_DUMMY_LINE_PERIOD: 4 dummy lines per gate
        EPD_Send_1(0x3B, 0x08);//SET_GATE_TIME: 2us per line
        EPD_Send_1(0x11, 0x03);//DATA_ENTRY_MODE_SETTING: X increment; Y increment

        EPD_lut(0x32, 30, &lut_full_mono[0]);

        EPD_Send_2(0x44, 0, 24);//SET_RAM_X_ADDRESS_START_END_POSITION: LO(x >> 3), LO((w-1) >> 3)
        EPD_Send_4(0x45, 0, 0, 200, 0);//SET_RAM_Y_ADDRESS_START_END_POSITION: LO(y), HI(y), LO(h - 1), HI(h - 1)
        EPD_Send_1(0x4E, 0);//LO(x >> 3)
        EPD_Send_2(0x4F, 0, 0);//LO(y), HI(y >> 8)

        EPD_SendCommand(0x24);//WRITE_RAM
        delay(2);
    } else {
        Serial.print("\r\nEPD1in54 V2");
        EPD_Reset();

        while (digitalRead(PIN_SPI_BUSY) == 1) delay(100);
        EPD_SendCommand(0x12);  //SWRESET
        while (digitalRead(PIN_SPI_BUSY) == 1) delay(100);

        EPD_SendCommand(0x01); //Driver output control
        EPD_SendData(0xC7);
        EPD_SendData(0x00);
        EPD_SendData(0x01);

        EPD_SendCommand(0x11); //data entry mode
        EPD_SendData(0x01);

        EPD_SendCommand(0x44); //set Ram-X address start/end position
        EPD_SendData(0x00);
        EPD_SendData(0x18);    //0x0C-->(18+1)*8=200

        EPD_SendCommand(0x45); //set Ram-Y address start/end position
        EPD_SendData(0xC7);   //0xC7-->(199+1)=200
        EPD_SendData(0x00);
        EPD_SendData(0x00);
        EPD_SendData(0x00);

        EPD_SendCommand(0x3C); //BorderWavefrom
        EPD_SendData(0x01);

        EPD_SendCommand(0x18);
        EPD_SendData(0x80);

        EPD_SendCommand(0x22); // //Load Temperature and waveform setting.
        EPD_SendData(0XB1);
        EPD_SendCommand(0x20);

        EPD_SendCommand(0x4E);   // set RAM x address count to 0;
        EPD_SendData(0x00);
        EPD_SendCommand(0x4F);   // set RAM y address count to 0X199;
        EPD_SendData(0xC7);
        EPD_SendData(0x00);
        while (digitalRead(PIN_SPI_BUSY) == 1) delay(100);
        Serial.print("\r\n init over");
        
        EPD_SendCommand(0x24);//DATA_START_TRANSMISSION_1
    }
    return 0;
}

int EPD_Init_1in54b()
{
    EPD_Reset();
    EPD_Send_4(0x01, 0x07, 0x00, 0x08, 0x00);//POWER_SETTING
    EPD_Send_3(0x06, 0x07, 0x07, 0x07);//BOOSTER_SOFT_START
    EPD_SendCommand(0x04);//POWER_ON
    EPD_WaitUntilIdle();

    EPD_Send_1(0x00, 0xCF);//PANEL_SETTING
    EPD_Send_1(0x50, 0x37);//VCOM_AND_DATA_INTERVAL_SETTING
    EPD_Send_1(0x30, 0x39);//PLL_CONTROL
    EPD_Send_3(0x61, 0xC8, 0x00, 0xC8);//TCON_RESOLUTION
    EPD_Send_1(0x82, 0x0E);//VCM_DC_SETTING_REGISTER

    EPD_SetLutBw (&lut_vcom0[0], &lut_w[0], &lut_b[0], &lut_g1[0], &lut_g2[0]);
    EPD_SetLutRed(&lut_vcom1[0], &lut_red0[0], &lut_red1[0]);

    EPD_SendCommand(0x10);//DATA_START_TRANSMISSION_1
    delay(2);
    return 0;
}

int EPD_1IN54B_V2_Init(void)
{
    EPD_Reset();
    EPD_WaitUntilIdle_high();  
	
    EPD_SendCommand(0x12);  //SWRESET
    EPD_WaitUntilIdle_high();   

    EPD_Send_3(0x01, 0xc7, 0x00, 0x01); //Driver output control      

    EPD_Send_1(0x11, 0x01); //data entry mode       

    EPD_Send_2(0x44, 0x00, 0x18); //set Ram-X address start/end position   

    EPD_Send_4(0x45, 0xc7, 0x00, 0x00, 0x00); //set Ram-Y address start/end position          

    EPD_Send_1(0x3C, 0x05); //BorderWavefrom

    EPD_Send_1(0x18, 0x80); //Read built-in temperature sensor

    EPD_Send_1(0x4E, 0x00);   // set RAM x address count to 0;
	
    EPD_Send_2(0x4F, 0xc7, 0x00);   // set RAM y address count to 0X199;    

    EPD_WaitUntilIdle_high();
	
	EPD_SendCommand(0x24);
    delay(2);
	return 0;
}

void EPD_1IN54B_V2_Show(void)
{
	//refresh
    EPD_Send_1(0x22, 0xf7); //Display Update Control
    EPD_SendCommand(0x20);  //Activate Display Update Sequence
    EPD_WaitUntilIdle_high();
	
	//sleep
    EPD_Send_1(0x10, 0x01); //enter deep sleep
    delay(2);
}

int EPD_Init_1in54c()
{
    EPD_Reset();
    EPD_Send_4(0x01, 0x07, 0x00, 0x08, 0x00);//POWER_SETTING
    EPD_Send_3(0x06, 0x17, 0x17, 0x17);//BOOSTER_SOFT_START
    EPD_SendCommand(0x04);//POWER_ON
    EPD_WaitUntilIdle();

    //EPD_Send_2(0x00, 0x0F, 0x0D);//PANEL_SETTING
    EPD_Send_1(0x50, 0xF7);//VCOM_AND_DATA_INTERVAL_SETTING
    EPD_Send_1(0x30, 0x39);//PLL_CONTROL
    EPD_Send_3(0x61, 0x98, 0x00, 0x98);//TCON_RESOLUTION
    EPD_Send_1(0x82, 0xF7);//VCM_DC_SETTING_REGISTER

    EPD_SetLutBw (&lut_vcom0[0], &lut_w[0], &lut_b[0], &lut_g1[0], &lut_g2[0]);
    EPD_SetLutRed(&lut_vcom1[0], &lut_red0[0], &lut_red1[0]);

    EPD_SendCommand(0x10);//DATA_START_TRANSMISSION_1
    delay(2);
    return 0;
}
