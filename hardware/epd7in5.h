/**
  ******************************************************************************
  * @file    edp7in5.h
  * @author  Waveshare Team
  * @version V1.0.0
  * @date    23-January-2018
  * @brief   This file describes initialisation of 7.5 and 7.5b e-Papers
  *
  ******************************************************************************
  */

UBYTE Voltage_Frame_7IN5_V2[]={
	0x6, 0x3F, 0x3F, 0x11, 0x24, 0x7, 0x17,
};

UBYTE LUT_VCOM_7IN5_V2[]={	
	0x0,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x0,	0xF,	0x1,	0xF,	0x1,	0x2,	
	0x0,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
};						

UBYTE LUT_WW_7IN5_V2[]={	
	0x10,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x84,	0xF,	0x1,	0xF,	0x1,	0x2,	
	0x20,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
};

UBYTE LUT_BW_7IN5_V2[]={	
	0x10,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x84,	0xF,	0x1,	0xF,	0x1,	0x2,	
	0x20,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
};

UBYTE LUT_WB_7IN5_V2[]={	
	0x80,	0xF,	0xF,	0x0,	0x0,	0x3,	
	0x84,	0xF,	0x1,	0xF,	0x1,	0x4,	
	0x40,	0xF,	0xF,	0x0,	0x0,	0x3,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
};

UBYTE LUT_BB_7IN5_V2[]={	
	0x80,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x84,	0xF,	0x1,	0xF,	0x1,	0x2,	
	0x40,	0xF,	0xF,	0x0,	0x0,	0x1,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	
};

int EPD_7in5__init() 
{
    EPD_Reset();
    EPD_Send_2(0x01, 0x37, 0x00);            //POWER_SETTING 
    EPD_Send_2(0x00, 0xCF, 0x08);            //PANEL_SETTING
    EPD_Send_3(0x06, 0xC7, 0xCC, 0x28);      //BOOSTER_SOFT_START
    EPD_SendCommand(0x4);                    //POWER_ON
    EPD_WaitUntilIdle();
    EPD_Send_1(0x30, 0x3C);                  //PLL_CONTROL
    EPD_Send_1(0x41, 0x00);                  //TEMPERATURE_CALIBRATION
    EPD_Send_1(0x50, 0x77);                  //VCOM_AND_DATA_INTERVAL_SETTING
    EPD_Send_1(0x60, 0x22);                  //TCON_SETTING
    EPD_Send_4(0x61, 0x02, 0x80, 0x01, 0x80);//TCON_RESOLUTION
    EPD_Send_1(0x82, 0x1E);                  //VCM_DC_SETTING: decide by LUT file
    EPD_Send_1(0xE5, 0x03);                  //FLASH MODE  

    EPD_SendCommand(0x10);//DATA_START_TRANSMISSION_1  
    delay(2);
    return 0;
}


/*****************************************************************************
                      EPD_7in5_V2
******************************************************************************/
static void EPD_7in5_V2_Readbusy(void)
{
    Serial.print("\r\ne-Paper busy\r\n");
    unsigned char busy;
	do{
		EPD_SendCommand(0x71);
		busy = digitalRead(PIN_SPI_BUSY);
		busy =!(busy & 0x01);        
	}while(busy);   
	delay(200);      
    Serial.print("e-Paper busy release\r\n");
}

static void EPD_7IN5_V2_Show(void)
{
    EPD_SendCommand(0x12);			//DISPLAY REFRESH
    delay(100);	        //!!!The delay here is necessary, 200uS at least!!!
    EPD_7in5_V2_Readbusy();

    //Enter sleep mode
    EPD_SendCommand(0X02);  	//power off
    EPD_7in5_V2_Readbusy();
    EPD_SendCommand(0X07);  	//deep sleep
    EPD_SendData(0xA5);
}

static void EPD_7IN5_V2_LUT(UBYTE* lut_vcom,  UBYTE* lut_ww, UBYTE* lut_bw, UBYTE* lut_wb, UBYTE* lut_bb)
{
	UBYTE count;

	EPD_SendCommand(0x20); //VCOM	
	for(count=0; count<60; count++)
		EPD_SendData(lut_vcom[count]);

	EPD_SendCommand(0x21); //LUTBW
	for(count=0; count<60; count++)
		EPD_SendData(lut_ww[count]);

	EPD_SendCommand(0x22); //LUTBW
	for(count=0; count<60; count++)
		EPD_SendData(lut_bw[count]);

	EPD_SendCommand(0x23); //LUTWB
	for(count=0; count<60; count++)
		EPD_SendData(lut_wb[count]);

	EPD_SendCommand(0x24); //LUTBB
	for(count=0; count<60; count++)
		EPD_SendData(lut_bb[count]);
}

int EPD_7in5_V2_init() 
{
    EPD_Reset();

    // EPD_SendCommand(0x01);			//POWER SETTING
    // EPD_SendData(0x07);
    // EPD_SendData(0x07);    //VGH=20V,VGL=-20V
    // EPD_SendData(0x3f);		//VDH=15V
    // EPD_SendData(0x3f);		//VDL=-15V

	EPD_SendCommand(0x01);  // power setting
	EPD_SendData(0x17);  // 1-0=11: internal power
	EPD_SendData(*(Voltage_Frame_7IN5_V2+6));  // VGH&VGL
	EPD_SendData(*(Voltage_Frame_7IN5_V2+1));  // VSH
	EPD_SendData(*(Voltage_Frame_7IN5_V2+2));  //  VSL
	EPD_SendData(*(Voltage_Frame_7IN5_V2+3));  //  VSHR
	
	EPD_SendCommand(0x82);  // VCOM DC Setting
	EPD_SendData(*(Voltage_Frame_7IN5_V2+4));  // VCOM

	EPD_SendCommand(0x06);  // Booster Setting
	EPD_SendData(0x27);
	EPD_SendData(0x27);
	EPD_SendData(0x2F);
	EPD_SendData(0x17);
	
    EPD_SendCommand(0x04); //POWER ON
    delay(100);
    EPD_7in5_V2_Readbusy();

    EPD_SendCommand(0X00);			//PANNEL SETTING
    EPD_SendData(0x3F);   //KW-3f   KWR-2F	BWROTP 0f	BWOTP 1f

    EPD_SendCommand(0x61);        	//tres
    EPD_SendData(0x03);		//source 800
    EPD_SendData(0x20);
    EPD_SendData(0x01);		//gate 480
    EPD_SendData(0xE0);

    EPD_SendCommand(0X15);
    EPD_SendData(0x00);

    EPD_SendCommand(0X50);			//VCOM AND DATA INTERVAL SETTING
    EPD_SendData(0x10);
    EPD_SendData(0x00);

    EPD_SendCommand(0X60);			//TCON SETTING
    EPD_SendData(0x22);

    EPD_SendCommand(0x65);  // Resolution setting
    EPD_SendData(0x00);
    EPD_SendData(0x00);//800*480
    EPD_SendData(0x00);
    EPD_SendData(0x00);
	
	EPD_7IN5_V2_LUT(LUT_VCOM_7IN5_V2, LUT_WW_7IN5_V2, LUT_BW_7IN5_V2, LUT_WB_7IN5_V2, LUT_BB_7IN5_V2);
	
    EPD_SendCommand(0x10);
    for(UWORD i=0; i<800 / 8 *480; i++) {
        EPD_SendData(0x00);
    }
	
    EPD_SendCommand(0x13);
    return 0;
}

/*****************************************************************************
                      EPD_7in5B_V2
******************************************************************************/

int EPD_7in5B_V2_Init(void)
{
    EPD_Reset();

    EPD_SendCommand(0x01);			//POWER SETTING
    EPD_SendData(0x07);
    EPD_SendData(0x07);    //VGH=20V,VGL=-20V
    EPD_SendData(0x3f);		//VDH=15V
    EPD_SendData(0x3f);		//VDL=-15V

    EPD_SendCommand(0x04); //POWER ON
    delay(100);
    EPD_7in5_V2_Readbusy();

    EPD_SendCommand(0X00);			//PANNEL SETTING
    EPD_SendData(0x0F);   //KW-3f   KWR-2F	BWROTP 0f	BWOTP 1f

    EPD_SendCommand(0x61);        	//tres
    EPD_SendData(0x03);		//source 800
    EPD_SendData(0x20);
    EPD_SendData(0x01);		//gate 480
    EPD_SendData(0xE0);

    EPD_SendCommand(0X15);
    EPD_SendData(0x00);

    EPD_SendCommand(0X50);			//VCOM AND DATA INTERVAL SETTING
    EPD_SendData(0x11);
    EPD_SendData(0x07);

    EPD_SendCommand(0X60);			//TCON SETTING
    EPD_SendData(0x22);

    EPD_SendCommand(0x65);  // Resolution setting
    EPD_SendData(0x00);
    EPD_SendData(0x00);//800*480
    EPD_SendData(0x00);
    EPD_SendData(0x00);
	
    UWORD i;
    EPD_SendCommand(0x10);
    for(i=0; i<800 / 8 *480; i++) {
        EPD_SendData(0x00);

    }
    EPD_SendCommand(0x13);
    for(i=0; i<800 / 8 *480; i++)	{
        EPD_SendData(0x00);
    }

    EPD_SendCommand(0x10);
    return 0;
}
