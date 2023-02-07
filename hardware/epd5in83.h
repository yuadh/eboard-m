/**
  ******************************************************************************
  * @file    edp5in83.h
  * @author  Waveshare Team
  * @version V1.1
  * @date    15-Dec-2020
  * @brief   This file describes initialisation of 5.83, 5.83b, 5.83c e-Papers
  *
  ******************************************************************************
  */

int EPD_5in83__init() 
{
    EPD_Reset();
    EPD_Send_2(0x01, 0x37, 0x00);            // POWER_SETTING 
    EPD_Send_2(0x00, 0xCF, 0x08);            // PANEL_SETTING
    EPD_Send_3(0x06, 0xC7, 0xCC, 0x28);      // BOOSTER_SOFT_START
    EPD_SendCommand(0x4);                    // POWER_ON
    EPD_WaitUntilIdle();
    EPD_Send_1(0x30, 0x3C);                  // PLL_CONTROL
    EPD_Send_1(0x41, 0x00);                  // TEMPERATURE_CALIBRATION
    EPD_Send_1(0x50, 0x77);                  // VCOM_AND_DATA_INTERVAL_SETTING
    EPD_Send_1(0x60, 0x22);                  // TCON_SETTING
    EPD_Send_4(0x61, 0x02, 0x58, 0x01, 0xC0);// TCON_RESOLUTION
    EPD_Send_1(0x82, 0x1E);                  // VCM_DC_SETTING: decide by LUT file
    EPD_Send_1(0xE5, 0x03);                  // FLASH MODE  
    EPD_SendCommand(0x10);                   // DATA_START_TRANSMISSION_1  
    delay(2);
    return 0;
}  

int EPD_Init_5in83_V2() 
{
    EPD_Reset();

    EPD_Send_4(0x01, 0x07, 0x07, 0x3f, 0x3f);            // POWER_SETTING 
	
    EPD_SendCommand(0x04);                    // POWER_ON
    delay(100);
    EPD_WaitUntilIdle();
	
    EPD_Send_1(0x00, 0x1F);            // PANEL_SETTING
	EPD_Send_4(0x61, 0x02, 0x88, 0x01, 0xE0);// TCON_RESOLUTION
    EPD_Send_1(0X15, 0x00);                  
    EPD_Send_2(0X50, 0x10, 0x07);               
    EPD_Send_1(0X60, 0x22);               
	
    EPD_SendCommand(0x10);                   // DATA_START_TRANSMISSION_1  
	for(UWORD i=0; i<38880; i++) {
		EPD_SendData(0x00);
	}
    EPD_SendCommand(0x13);                   // DATA_START_TRANSMISSION_2
    delay(2);
    return 0;
}  

int EPD_5in83b__init() 
{
    EPD_Reset();
    EPD_Send_2(0x01, 0x37, 0x00);            // POWER_SETTING 
    EPD_Send_2(0x00, 0xCF, 0x08);            // PANEL_SETTING
    EPD_Send_3(0x06, 0xC7, 0xCC, 0x28);      // BOOSTER_SOFT_START
    EPD_SendCommand(0x4);                    // POWER_ON
    EPD_WaitUntilIdle();
    EPD_Send_1(0x30, 0x3A);                  // PLL_CONTROL
    EPD_Send_1(0x41, 0x00);                  // TEMPERATURE_CALIBRATION
    EPD_Send_1(0x50, 0x77);                  // VCOM_AND_DATA_INTERVAL_SETTING
    EPD_Send_1(0x60, 0x22);                  // TCON_SETTING
    EPD_Send_4(0x61, 0x02, 0x58, 0x01, 0xC0);// TCON_RESOLUTION
    EPD_Send_1(0x82, 0x20);                  // VCM_DC_SETTING: decide by LUT file
    EPD_Send_1(0xE5, 0x03);                  // FLASH MODE  
    EPD_SendCommand(0x10);                   // DATA_START_TRANSMISSION_1  
    delay(2);
    return 0;
}

int EPD_5in83b_V2_init() 
{
    EPD_Reset();
	EPD_Send_4(0x01, 0x07, 0x07, 0x3f, 0x3f);			//POWER SETTING
	EPD_SendCommand(0x04); //POWER ON
	delay(100);  
	EPD_WaitUntilIdle();        //waiting for the electronic paper IC to release the idle signal
	EPD_Send_1(0X00, 0x0F);			//PANNEL SETTING
	EPD_Send_4(0x61, 0x02, 0x88, 0x01, 0xe0);        	//tres			
	EPD_Send_1(0X15, 0x00);		
	EPD_Send_2(0X50, 0x11, 0x07);			//VCOM AND DATA INTERVAL SETTING
	EPD_Send_1(0X60, 0x22);			//TCON SETTING
	EPD_SendCommand(0x10);                   // DATA_START_TRANSMISSION_1  
	delay(2);
    return 0;
}