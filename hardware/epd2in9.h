/**
  ******************************************************************************
  * @file    edp2in9.h
  * @author  Waveshare Team
  * @version V1.1
  * @date    23-Oct-2020
  * @brief   This file describes initialisation of 2.9 and 2.9b e-Papers
  *
  ******************************************************************************
  */
int EPD_Init_2in9() 
{
    EPD_Reset();
    EPD_Send_3(0x01, 39, 1, 0);//DRIVER_OUTPUT_CONTROL:LO(EPD_HEIGHT-1),HI(EPD_HEIGHT-1), GD = 0; SM = 0; TB = 0;
    EPD_Send_3(0x0C, 0xD7, 0xD6, 0x9D);//BOOSTER_SOFT_START_CONTROL
    EPD_Send_1(0x2C, 0xA8);//WRITE_VCOM_REGISTER:VCOM 7C
    EPD_Send_1(0x3A, 0x1A);//SET_DUMMY_LINE_PERIOD: 4 dummy lines per gate
    EPD_Send_1(0x3B, 0x08);//SET_GATE_TIME: 2us per line
    EPD_Send_1(0x11, 0x03);//DATA_ENTRY_MODE_SETTING: X increment; Y increment
 
    EPD_Send_2(0x44, 0, 15);//SET_RAM_X_ADDRESS_START_END_POSITION: LO(x >> 3), HI ((w-1) >> 3)
    EPD_Send_4(0x45, 0, 0, 45, 1);//SET_RAM_Y_ADDRESS_START_END_POSITION: LO(y), HI(y), LO(h - 1),HI(h - 1)

    EPD_Send_1(0x4E, 0);//SET_RAM_X_ADDRESS_COUNTER: LO(x >> 3)
    EPD_Send_2(0x4F, 0, 0);//SET_RAM_Y_ADDRESS_COUNTER: LO(y), HI(y)

    EPD_lut(0x32, 30, &lut_full_mono[0]);

    EPD_SendCommand(0x24);//WRITE_RAM
    delay(2);
    return 0;
}

int EPD_Init_2in9_V2() 
{
    EPD_Reset();
    EPD_WaitUntilIdle_high();
	
    EPD_SendCommand(0x12); //SWRESET
    EPD_WaitUntilIdle_high();
    EPD_Send_3(0x01, 0x27, 0x01, 0x00);//Driver output control   
    EPD_Send_1(0x11, 0x03);//data entry mode
    EPD_Send_2(0x21, 0x00, 0x80);//  Display update control
	
    EPD_Send_2(0x44, 0x00, 0x0f);// SET_RAM_X_ADDRESS_START_END_POSITION
    EPD_Send_4(0x45, 0x00, 0x00, 0x27, 0x01);// SET_RAM_Y_ADDRESS_START_END_POSITION

    EPD_Send_1(0x4e, 0x00);// // SET_RAM_X_ADDRESS_COUNTER
    EPD_Send_2(0x4f, 0x00, 0x00);// SET_RAM_Y_ADDRESS_COUNTER
	
    EPD_WaitUntilIdle_high();
    EPD_SendCommand(0x24);//WRITE_RAM
    delay(2);
    return 0;
}

void EPD_2IN9_V2_Show(void)
{
	Serial.print("\r\n EPD_2IN9_V2_Show");
	EPD_Send_1(0x22, 0xF7); //Display Update Control
	EPD_SendCommand(0x20); //Activate Display Update Sequence
	EPD_WaitUntilIdle_high();   
}

int EPD_Init_2in9b() 
{
    EPD_Reset();
    EPD_Send_4(0x01, 0x07, 0x00, 0x08, 0x00);//POWER_SETTING
    EPD_Send_3(0x06, 0x17, 0x17, 0x17);//BOOSTER_SOFT_START
    EPD_SendCommand(0x04);//POWER_ON
    EPD_WaitUntilIdle();
    
    EPD_Send_1(0x00, 0x8F);//PANEL_SETTING
    EPD_Send_1(0x50, 0x77);//VCOM_AND_DATA_INTERVAL_SETTING;
    EPD_Send_1(0x30, 0x39);//PLL_CONTROL
    EPD_Send_3(0x61, 0x80, 0x01, 0x28);//TCON_RESOLUTION
    EPD_Send_1(0x82, 0x0A);//VCM_DC_SETTING_REGISTER

    EPD_SendCommand(0x10);//DATA_START_TRANSMISSION_1  
    delay(2);
    return 0;
}


int EPD_Init_2in9b_V3() 
{
    EPD_Reset();
    EPD_SendCommand(0x04);//POWER_ON
    EPD_WaitUntilIdle();
    
    EPD_Send_2(0x00, 0x0F, 0x89);//PANEL_SETTING
    EPD_Send_3(0x61, 0x80, 0x01, 0x28);//TCON_RESOLUTION
    EPD_Send_1(0x50, 0x77);//VCOM_AND_DATA_INTERVAL_SETTING;

    EPD_SendCommand(0x10);//DATA_START_TRANSMISSION_1  
    delay(2);
    return 0;
}

/************************************************************************************/
#define UBYTE   uint8_t
#define UWORD   uint16_t
#define UDOUBLE uint32_t


#define EPD_2IN9D_WIDTH   128
#define EPD_2IN9D_HEIGHT  296

void EPD_2IN9D_ReadBusy(void)
{
  Serial.print("\r\ne-Paper busy");
    UBYTE busy;
    do {
        EPD_SendCommand(0x71);
        busy = digitalRead(PIN_SPI_BUSY);
        busy = !(busy & 0x01);
		delay(20);
    } while(busy);
    delay(20);
    Serial.print("\r\ne-Paper busy free");
}

void EPD_2IN9D_Show(void)
{
	Serial.print("\r\nEPD_2IN9D_Show");
    EPD_SendCommand(0x12);		 //DISPLAY REFRESH
    delay(10);     //!!!The delay here is necessary, 200uS at least!!!

    EPD_2IN9D_ReadBusy();
	delay(200);
    // Sleep
    EPD_SendCommand(0X50);
    EPD_SendData(0xf7);
    EPD_SendCommand(0X02);  	//power off
    EPD_2IN9D_ReadBusy();
    EPD_SendCommand(0X07);  	//deep sleep
    EPD_SendData(0xA5);
}

void EPD_2IN9D_Clear(void)
{
    UWORD Width, Height;
    Width = (EPD_2IN9D_WIDTH % 8 == 0)? (EPD_2IN9D_WIDTH / 8 ): (EPD_2IN9D_WIDTH / 8 + 1);
    Height = EPD_2IN9D_HEIGHT;

    EPD_SendCommand(0x10);
    for (UWORD j = 0; j < Height; j++) {
        for (UWORD i = 0; i < Width; i++) {
            EPD_SendData(0x00);
        }
    }

    EPD_SendCommand(0x13);

}

int EPD_Init_2in9d()
{
    EPD_Reset();

    EPD_SendCommand(0x04);
    EPD_2IN9D_ReadBusy();

    EPD_SendCommand(0x00);	//panel setting
    EPD_SendData(0x1f);     //LUT from OTP，128x296

    EPD_SendCommand(0x61);	//resolution setting
    EPD_SendData(EPD_2IN9D_WIDTH);
    EPD_SendData((EPD_2IN9D_HEIGHT >> 8) & 0xff);
    EPD_SendData(EPD_2IN9D_HEIGHT & 0xff);

    EPD_SendCommand(0x50);	//vcom_DC setting
    EPD_SendData(0x97);
    delay(2);

    EPD_2IN9D_Clear();

    return 0;
}
